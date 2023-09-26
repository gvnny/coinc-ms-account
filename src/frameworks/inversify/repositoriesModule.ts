import { ContainerModule, interfaces } from "inversify";

import { IAccountRepository } from "./../../business/contracts/repositories/iAccountRepository";
import { AccountRepository } from "./../repositories/accountRepository";

export const RepositoriesModule = new ContainerModule(
  (bind: interfaces.Bind) => {
    bind<IAccountRepository>(Symbol.for("IAccountRepository")).to(AccountRepository);
  }
);
