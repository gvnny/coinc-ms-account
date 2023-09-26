import "reflect-metadata";
import "./../inversify/inversify.config";
import {
  Handler,
  APIGatewayProxyEvent,
  Context,
  APIGatewayProxyResult,
} from "aws-lambda";
import { AccountController } from "./../../adapters/controllers/accountController";
import { container } from "./../inversify/container";
import {
  GetAccountRequest,
  GetAccountRequestSchema,
} from "./../../adapters/serializers/getAccountRequest";
import "./../models/index";

export const handler: Handler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  try {
    context.callbackWaitsForEmptyEventLoop = false;
    const accountInput: GetAccountRequest = GetAccountRequestSchema.parse(
      JSON.parse(JSON.stringify(event.pathParameters))
    );

    const accountController = container.get(AccountController);

    const result = await accountController.getAccount(accountInput);

    return result;
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Oh-oh! Something went wrong." }),
    };
  }
};
