import { Result } from "../contracts/result.contracts";

export class Response {
  public static invalidCredentials(): Result {
    return {
      success: false,
      message: "Acesso não autorizado",
      code: 401,
    };
  }

  public static notFound(entity: string): Result {
    return {
      success: false,
      message: `${entity} not found`,
      code: 404,
    };
  }

  public static invalid(entity: string): Result {
    return {
      success: false,
      message: `${entity} is invalid`,
      code: 400
    };
  }

  public static success(message: string, data: any): Result {
    return {
      success: true,
      message,
      data,
      code: 200,
    };
  }
}
