import "reflect-metadata";

import { GetAccountUseCase } from "./../../../src/business/usecases/getAccountUseCase";
import { IAccountRepository } from "./../../../src/business/contracts/repositories/iAccountRepository";
import { AccountOutput } from "./../../../src/business/usecases/output/accountOutput";
import { IGetAccountInput } from "./../../../src/business/usecases/input/iGetAccountInput";
import { AccountNotFound, GetAccountFailed } from "./../../../src/business/errors";
import { IAccountEntity } from "./../../../src/entities/iAccountEntity";
import { IError } from "./../../../src/business/contracts/iError";
import { CardTypes } from "../../../src/frameworks/models/accountModel";

import * as E from "fp-ts/Either";

describe(GetAccountUseCase.name, () => {
  let accountRepositoryMockGetFunction: jest.Mock;
  let accountRepositoryMock: IAccountRepository;
  let getAccountUseCase: GetAccountUseCase;
  let accountOutput: AccountOutput;
  let accountInput: IGetAccountInput;
  let result: AccountOutput;

  beforeEach(() => {
    accountRepositoryMockGetFunction = jest.fn();
    accountRepositoryMock = {
      show: accountRepositoryMockGetFunction,
    };
    getAccountUseCase = new GetAccountUseCase(accountRepositoryMock);
  });

  describe("When success", () => {
    it("should return an account when found", async () => {
      accountInput = {
        accountId: "65148205830de63d3cd60bc4",
      };

      accountOutput = E.right<IError, IAccountEntity>({
        _id: "65148205830de63d3cd60bc4",
        name: "Test Account",
        color: "#D1D2D3",
        balance: 100,
        cards: [
          {
            id: "77788899911de63d3cd60cc9",
            type: CardTypes.CREDIT,
            name: "Test Card",
            number: "1234567890123456",
            limit: 100,
            expires: new Date(),
          },
        ],
      });

      accountRepositoryMockGetFunction.mockResolvedValueOnce(accountOutput);

      result = await getAccountUseCase.exec(accountInput);

      expect(accountRepositoryMockGetFunction).toHaveBeenCalledWith(
        accountInput.accountId
      );
      expect(result).toEqual(E.right(accountOutput));
    });
  });

  describe("When error", () => {
    it("should return AccountNotFound when an account is not found", async () => {
      accountRepositoryMockGetFunction.mockResolvedValueOnce(null);

      accountInput.accountId = "123";

      result = await getAccountUseCase.exec(accountInput);

      expect(accountRepositoryMockGetFunction).toHaveBeenCalledWith(accountInput.accountId);
      expect(result).toEqual(E.left(AccountNotFound));
    });

    it("should return GetAccountFailed when an error occurs", async () => {
      accountRepositoryMockGetFunction.mockRejectedValueOnce(
        new Error("Test Error")
      );

      result = await getAccountUseCase.exec(accountInput);

      expect(accountRepositoryMockGetFunction).toHaveBeenCalledWith(
        accountInput.accountId
      );
      expect(result).toEqual(E.left(GetAccountFailed));
    });
  });
});
