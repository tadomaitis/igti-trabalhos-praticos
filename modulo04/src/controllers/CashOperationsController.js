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
}

export default CashOperationsController;
