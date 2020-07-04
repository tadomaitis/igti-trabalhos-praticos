import express from "express";
import { accountModel } from "../models/account.js";

const accountsRouter = express.Router();

accountsRouter.use(express.json());

// accountsRouter.get("/accounts", (req, res) => {
//   res.send({ ok: true });
// });

accountsRouter.get("/accounts", async (_, res) => {
  try {
    const account = await accountModel.find({});
    res.send(account);
  } catch (error) {
    res.status(500).send(error);
  }
});

accountsRouter.post("/accounts", async (req, res) => {
  try {
    const account = new accountModel(req.body);
    await account.save();

    res.send(account);
  } catch (error) {
    res.status(500).send(error);
  }
});

export { accountsRouter };
