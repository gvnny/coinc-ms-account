import { Document, Schema, model, Model } from "mongoose";

interface IAccount extends Document {
  accountId: string;
  name: string;
  email: string;
}

const schema = new Schema<IAccount>({
  accountId: { type: String, index: true, unique: true },
  name: { type: String },
  email: { type: String, index: true, unique: true },
});

export const AccountModel: Model<IAccount> = model("Accounts", schema);
