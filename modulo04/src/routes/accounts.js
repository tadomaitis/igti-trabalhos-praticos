import express from "express";

import AccountsController from "../controllers/AccountsController.js";
import CashOperationsController from "../controllers/CashOperationsController.js";

const accountsRouter = express.Router();
const accountsController = new AccountsController();
const cashOperationsController = new CashOperationsController();

accountsRouter.use(express.json());

accountsRouter.get("/accounts", accountsController.index);
accountsRouter.get("/accounts/:id", accountsController.show);
accountsRouter.post("/accounts", accountsController.create);
accountsRouter.delete("/accounts/:id", accountsController.delete);
accountsRouter.delete("/:agency/:account", accountsController.delete);

accountsRouter.get("/average/:agency", cashOperationsController.averageBalance);
accountsRouter.get("/lowest/:limit", cashOperationsController.lowestBalance);
accountsRouter.get("/highest/:limit", cashOperationsController.highestBalance);
accountsRouter.get("/:agency/:account", cashOperationsController.balance);
accountsRouter.patch("/transfer", cashOperationsController.transfer);
accountsRouter.patch("/withdraw", cashOperationsController.withdraw);
accountsRouter.patch("/deposit", cashOperationsController.deposit);

export { accountsRouter };
