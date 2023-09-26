import { injectable, inject } from "inversify";
import { left, right } from "fp-ts/Either";
import { IAccountRepository } from "./../contracts/repositories/iAccountRepository";
import { AccountOutput } from "./output/accountOutput";
import { IGetUseCase } from "./../contracts/usecases/iGetUseCase";
import { IGetAccountInput } from "./input/iGetAccountInput";
import { GetAccountFailed, AccountNotFound } from "./../errors";

@injectable()
export class GetAccountUseCase implements IGetUseCase<IGetAccountInput, AccountOutput> {
  constructor(
    @inject(Symbol.for("IAccountRepository"))
    private accountRepository: IAccountRepository
  ) {}

  async exec(input: IGetAccountInput): Promise<AccountOutput> {
    try {
      const account = await this.accountRepository.show(input.accountId);

      if (!account) {
        return left(AccountNotFound);
      } else {
        return right(account);
      }
    } catch (ex) {
      return left(GetAccountFailed);
    }
  }
}
