import express from "express";

const accountsRouter = express.Router();

accountsRouter.use(express.json());

accountsRouter.get("/accounts", (req, res) => {
  res.send({ ok: true });
});

export { accountsRouter };
