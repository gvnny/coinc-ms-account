import { ContainerModule, interfaces } from "inversify";
import { AccountController } from "./../../adapters/controllers/accountController";

export const ControllerModule = new ContainerModule((bind: interfaces.Bind) => {
  bind(AccountController).toSelf();
});
