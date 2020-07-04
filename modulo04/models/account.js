import mongoose from "mongoose";

const accountSchema = mongoose.Schema({
  agency: {
    type: Number,
    required: true,
  },
  account: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    required: true,
    validade(value) {
      if (value < 0) throw new Error("Can't allow negative value to balance");
    },
  },
});

const accountModel = mongoose.model("accounts", accountSchema, "accounts");

export { accountModel };
