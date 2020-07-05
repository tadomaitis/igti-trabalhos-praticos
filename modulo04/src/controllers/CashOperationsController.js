import { accountModel } from "../../models/account.js";

class CashOperationsController {
  async deposit(req, res) {
    try {
      const { agency, account, depositValue } = req.body;

      const depositDestiny = await accountModel.findOne({
        agency: agency,
        account: account,
      });

      const currentBalance = depositDestiny.balance;
      depositDestiny.balance = currentBalance + depositValue;
      await depositDestiny.save();

      res.status(200).send("Deposit has ben completed successfully.");
      if (!depositDestiny) {
        res.status(404).send("Account not found in database");
      }
    } catch (error) {
      res.status(500).send(error);
    }
  }
}

export default CashOperationsController;
