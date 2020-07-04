import express from "express";
import { accountsRouter } from "./routes/accounts.js";

const app = express();

app.use(accountsRouter);

app.listen(3333, () => {
  console.log("Api successfully started on port 3333....");
});
