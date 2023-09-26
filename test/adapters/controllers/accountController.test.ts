import "reflect-metadata";

import { APIGatewayProxyResult } from "aws-lambda";
import { AccountController } from "./../../../src/adapters/controllers/accountController";
import { IGetUseCase } from "./../../../src/business/contracts/usecases/iGetUseCase";
import { IGetAccountInput } from "./../../../src/business/usecases/input/iGetAccountInput";
import { AccountOutput } from "./../../../src/business/usecases/output/accountOutput";
import { AccountNotFound, GetAccountFailed } from "./../../../src/business/errors";
import { IAccountEntity } from "./../../../src/entities/iAccountEntity";
import { mock, when, instance } from "ts-mockito";

import * as E from "fp-ts/Either";

describe(AccountController.name, () => {
  let getAccountUseCaseMock: IGetUseCase<IGetAccountInput, AccountOutput>;
  let accountController: AccountController;
  let accountEntity: IAccountEntity;
  let accountOutput: AccountOutput;
  let accountInput: IGetAccountInput;
  let result: APIGatewayProxyResult;

  beforeEach(() => {
    getAccountUseCaseMock = mock<IGetUseCase<IGetAccountInput, AccountOutput>>();
    accountController = new AccountController(instance(getAccountUseCaseMock));
    accountInput = { accountId: "1" };
    accountEntity = {
      accountId: accountInput.accountId,
      name: "Teste",
      email: "teste@teste.com",
    };
    accountOutput = E.right(accountEntity);
  });

  describe("When success", () => {
    it("should return an account when found", async () => {
      when(getAccountUseCaseMock.exec(accountInput)).thenResolve(accountOutput);
      result = await accountController.getAccount(accountInput);

      expect(result.statusCode).toBe(200);
      expect(result.body).toEqual(JSON.stringify(accountEntity));
    });
  });

  describe("When error", () => {
    it("should return AccountNotFound when an account is not found", async () => {
      accountOutput = E.left(AccountNotFound);
      when(getAccountUseCaseMock.exec(accountInput)).thenResolve(
        E.left(AccountNotFound)
      );

      result = await accountController.getAccount(accountInput);
      expect(result.statusCode).toBe(400);
      expect(result.body).toEqual(JSON.stringify({ error: AccountNotFound }));
    });

    it("should return GetAccountFailed when error is thown", async () => {
      when(getAccountUseCaseMock.exec(accountInput)).thenResolve(
        E.left(GetAccountFailed)
      );

      result = await accountController.getAccount(accountInput);
      expect(result.statusCode).toEqual(400);
      expect(result.body).toEqual(JSON.stringify({ error: GetAccountFailed }));
    });
  });
});
