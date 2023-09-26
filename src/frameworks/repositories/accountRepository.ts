import { inject, injectable } from "inversify";
import { IAccountRepository } from "./../../business/contracts/repositories/iAccountRepository";
import { IAccountEntity } from "../../entities/iAccountEntity";
import { AccountModel } from "./../models/accountModel";

@injectable()
export class AccountRepository implements IAccountRepository {
  public constructor(@inject(AccountModel) private accountModel: typeof AccountModel) {}

  async show(accountId: string): Promise<IAccountEntity> {
    try {
      const account = await this.accountModel.findOne({ accountId }).exec();
      return account as IAccountEntity;
    } catch (error) {
      console.log("ERRO: ", JSON.stringify(error.message));
      throw new Error(
        `Internal Server Error: ${JSON.stringify(error.message)}`
      );
    }
  }
}
