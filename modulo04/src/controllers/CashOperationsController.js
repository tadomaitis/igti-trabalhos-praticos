import { accountModel } from "../../models/account.js";

const WITHDRAW_TAX = 1;
const TRANSFER_TAX = 8;

class CashOperationsController {
  async deposit(req, res) {
    try {
      const { agency, account, depositValue } = req.body;

      const depositDestiny = await accountModel.findOne({
        agency: agency,
        account: account,
      });

      if (!depositDestiny) {
        res.status(404).send("Account not found in database");
        return;
      }

      const currentBalance = depositDestiny.balance;
      depositDestiny.balance = currentBalance + depositValue;
      await depositDestiny.save();

      res.status(200).send(
        `Deposit has ben completed successfully.
          The current balance now is ${depositDestiny.balance}`
      );
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async withdraw(req, res) {
    try {
      const { agency, account, withdrawValue } = req.body;

      const withdrawSource = await accountModel.findOne({
        agency: agency,
        account: account,
      });

      if (!withdrawSource) {
        res.status(404).send("Account not found in database");
        return;
      }

      const currentBalance = withdrawSource.balance;

      if (currentBalance < withdrawValue + 1) {
        res
          .status(500)
          .send(
            `Current account balance isn't enough to complete this operation`
          );
        return;
      }

      withdrawSource.balance = currentBalance - withdrawValue - WITHDRAW_TAX;
      await withdrawSource.save();

      res.status(200).send(
        `Withdraw has ben completed successfully.
          The current balance now is ${withdrawSource.balance}`
      );
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async balance(req, res) {
    try {
      const { agency, account } = req.params;
      const currentAccount = await accountModel.findOne({
        agency: agency,
        account: account,
      });

      if (!currentAccount) {
        res.status(404).send("Account not found in database");
        return;
      }

      res
        .status(200)
        .send(`Current account balance: ${currentAccount.balance}`);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async transfer(req, res) {
    try {
      const {
        sourceAgencyNumber,
        sourceAccountNumber,
        destinyAgencyNumber,
        destinyAccountNumber,
        transferValue,
      } = req.body;

      const sourceAccount = await accountModel.findOne({
        agency: sourceAgencyNumber,
        account: sourceAccountNumber,
      });

      const destinyAccount = await accountModel.findOne({
        agency: destinyAgencyNumber,
        account: destinyAccountNumber,
      });

      if (!sourceAccount || !destinyAccount) {
        res.status(404).send("Account not found in database");
        return;
      }

      const sourceAccountBalance = sourceAccount.balance;
      const destinyAccountBalance = destinyAccount.balance;

      if (sourceAgencyNumber === destinyAgencyNumber) {
        sourceAccount.balance = sourceAccountBalance - transferValue;
      } else {
        sourceAccount.balance =
          sourceAccountBalance - transferValue - TRANSFER_TAX;
      }
      destinyAccount.balance = destinyAccountBalance + transferValue;
      sourceAccount.save();
      destinyAccount.save();

      res
        .status(200)
        .send(`Transfer succeed; remaining balance: ${sourceAccount.balance}`);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async averageBalance(req, res) {
    try {
      const agency = req.params.agency;
      const allAgencyAccounts = await accountModel.find({ agency: agency });
      if (allAgencyAccounts.length === 0) {
        res.status(404).send("Agency not found in database");
        return;
      }
      const allValues = allAgencyAccounts.map((account) => {
        return account.balance;
      });

      const totalValue = allValues.reduce((accum, curr) => {
        return accum + curr;
      }, 0);
      const averageBalance = totalValue / allAgencyAccounts.length;
      res.status(200).send(`Average Balance in this agency: ${averageBalance}`);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async lowestBalance(req, res) {
    try {
      const limit = parseInt(req.params.limit);
      const sortedBalance = await accountModel
        .find()
        .sort({ balance: "asc" })
        .limit(limit);
      if (sortedBalance.length === 0) {
        res.status(400).send("Couldn't fetch any data from database");
        return;
      }
      res.status(200).send(sortedBalance);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async highestBalance(req, res) {
    try {
      const limit = parseInt(req.params.limit);
      const sortedBalance = await accountModel
        .find()
        .sort({ balance: "desc" })
        .limit(limit);
      if (sortedBalance.length === 0) {
        res.status(400).send("Couldn't fetch any data from database");
        return;
      }
      res.status(200).send(sortedBalance);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async moveClientToPrivateAgency(_, res) {
    try {
      let accounts = await accountModel.aggregate([
        {
          $sort: {
            balance: -1,
          },
        },
        {
          $group: {
            _id: "$agency",
            account: {
              $first: "$_id",
            },
          },
        },
      ]);

      for (let account of accounts) {
        const updatedAccount = await accountModel.findByIdAndUpdate(
          account.account,
          {
            $set: {
              agency: 99,
            },
          },
          {
            runValidators: true,
          }
        );
      }

      accounts = await accountModel
        .find({
          agency: 99,
        })
        .exec();

      res.send(accounts);

      return accounts;
    } catch (error) {
      res.status(500).send(error);
    }
  }
}

export default CashOperationsController;
