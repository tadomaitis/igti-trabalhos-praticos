import express from "express";
import { accountsRouter } from "../routes/accounts.js";
import mongoose from "mongoose";
import fs from "fs";

// (async () => {
//   try {
//     fs.readFile("accounts.json", "utf8", (err, data) => {
//       if (err) {
//         console.warn(`Error: ${err}`);
//       }
//       const accounts = JSON.parse(data);
//       console.log(accounts);
//     });
//   } catch (error) {
//     console.log(`Error opening file: ${error}`);
//   }
// })();

(async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/accounts", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log("Connected to MongoDB on port 27017");
  } catch (error) {
    console.log(`Error connecting to MongoDB: ${error}`);
  }
})();

const app = express();

app.use(accountsRouter);

app.listen(3333, () => {
  console.log("Api successfully started on port 3333....");
});
