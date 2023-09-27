import { Document, Schema, model, Model } from "mongoose";

export enum CardTypes {
  DEBIT = "debit",
  CREDIT = "credit"
}

export interface ICard {
  id: String
  type: CardTypes
  name: String
  number: String
  limit?: Number
  expires?: Date
}

export interface IAccount extends Document {
  name: String
  color?: String
  balance: Number
  cards?: ICard[];
}

const cardSchema = new Schema<ICard>({
  id: { type: String, index: true, unique: true },
  type: { type: String, enum: CardTypes, required: true },
  name: { type: String, required: true },
  number: { type: String },
  limit: { type: Number },
  expires: { type: Date }
});

const schema = new Schema<IAccount>({
  name: { type: String, required: true },
  color: { type: String, default: "#11D07D" },
  balance: { type: Number, default: 0 },
  cards: [cardSchema]
});

export const AccountModel: Model<IAccount> = model("Accounts", schema);
