import express from "express";

const app = express();

app.get("/", (_, res) => {
  res.send("ok");
});

app.listen(3333, () => {
  console.log("Api successfully started on port 3333....");
});
