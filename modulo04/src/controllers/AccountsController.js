import { accountModel } from "../../models/account.js";

class AccountsController {
  async index(_, res) {
    try {
      const account = await accountModel.find({});
      res.send(account);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async create(req, res) {
    try {
      const account = new accountModel(req.body);
      await account.save();
      res.send(account);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async show(req, res) {
    try {
      const account = await accountModel.findOne({ _id: req.params.id });
      if (!account) {
        res.status(404).send("Account not found in database");
      }
      res.status(200).send(account);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async delete(req, res) {
    try {
      const { agency, account } = req.params;
      const deletingAccount = await accountModel.findOneAndDelete({
        agency: agency,
        account: account,
      });
      if (!deletingAccount) {
        res.status(404).send("Account not found in database");
        return;
      }

      const agencyAccounts = await accountModel.find({ agency: agency });
      res.send(
        `Account deleted; there are still ${agencyAccounts.length} active accounts in this agency.`
      );
    } catch (error) {
      res.status(500).send(error);
    }
  }
}

export default AccountsController;
