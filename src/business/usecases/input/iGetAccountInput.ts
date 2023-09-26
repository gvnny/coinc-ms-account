import { IAccountEntity } from "../../../entities/iAccountEntity";
import { IError } from "../../contracts/iError";
import * as E from "fp-ts/Either";

export interface IGetAccountInput {
  accountId: string;
}
