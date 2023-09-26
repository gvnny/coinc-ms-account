import { ContainerModule, interfaces } from "inversify";

import { GetAccountUseCase } from "../../business/usecases/getAccountUseCase";
import { IGetUseCase } from "../../business/contracts/usecases/iGetUseCase";
import { IGetAccountInput } from "../../business/usecases/input/iGetAccountInput";
import { AccountOutput } from "../../business/usecases/output/accountOutput";

export const UseCasesModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<IGetUseCase<IGetAccountInput, AccountOutput>>(Symbol.for("IGetUseCase")).to(
    GetAccountUseCase
  );
});
