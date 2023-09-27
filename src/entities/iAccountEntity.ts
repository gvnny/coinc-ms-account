import { CardTypes } from "../frameworks/models/accountModel";

export interface IAccountEntity {
  _id: String;
  name: String;
  color?: String;
  balance: Number;
  cards?: ICardEntity[];
}

export interface ICardEntity {
  id: String;
  type: CardTypes;
  name: String;
  number: String;
  limit?: Number;
  expires?: Date;
}