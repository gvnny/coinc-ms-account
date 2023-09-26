import { IAccountEntity } from "../../../entities/iAccountEntity";

export interface IAccountRepository {
  show(accountId: string): Promise<IAccountEntity>;
}
