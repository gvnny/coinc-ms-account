import { APIGatewayProxyResult } from "aws-lambda";
import { injectable, inject } from "inversify";
import * as E from "fp-ts/Either";
import { IGetUseCase } from "./../../business/contracts/usecases/iGetUseCase";
import { IGetAccountInput } from "./../../business/usecases/input/iGetAccountInput";
import { AccountOutput } from "./../../business/usecases/output/accountOutput";
import _ from "lodash";
@injectable()
export class AccountController {
  constructor(
    @inject(Symbol.for("IGetUseCase"))
    private getAccountUseCase: IGetUseCase<IGetAccountInput, AccountOutput>
  ) {}

  async getAccount(input: IGetAccountInput): Promise<APIGatewayProxyResult> {
    const result = await this.getAccountUseCase.exec(input);
    if (E.isLeft(result)) {
      return this.getErrorResponse(400, result.left);
    } else {
      return this.getSuccessResponse(result.right);
    }
  }

  private getErrorResponse(
    statusCode: number,
    errorData: Object
  ): APIGatewayProxyResult {
    return {
      statusCode: statusCode,
      body: JSON.stringify({ error: errorData }),
    };
  }

  private getSuccessResponse(data: Object): APIGatewayProxyResult {
    return {
      statusCode: 200,
      body: JSON.stringify(_.omit(data, ["_tag", "accountId"])),
    };
  }
}
