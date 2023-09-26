import { ContainerModule, interfaces } from "inversify";
import * as models from "./../models";

export const ModelsModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<typeof models.AccountModel>(models.AccountModel).toConstructor(
    models.AccountModel
  );
});
