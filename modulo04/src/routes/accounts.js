import express from "express";

import AccountsController from "../controllers/AccountsController.js";
import CashOperationsController from "../controllers/CashOperationsController.js";

const accountsRouter = express.Router();
const accountsController = new AccountsController();
const cashOperationsController = new CashOperationsController();

accountsRouter.use(express.json());

accountsRouter.get("/accounts", accountsController.index);
accountsRouter.post("/accounts", accountsController.create);
accountsRouter.get("/accounts/:id", accountsController.show);
accountsRouter.delete("/accounts/:id", accountsController.delete);

accountsRouter.patch("/deposit", cashOperationsController.deposit);
accountsRouter.patch("/withdraw", cashOperationsController.withdraw);

export { accountsRouter };
