import { HttpException } from "@nestjs/common";
import { ErrorCodeMap } from "../constants/error-code";

/**
 * Api 业务异常类
 */
export class ApiException extends HttpException{
  private readonly errorCode: number;

  constructor(errorCode: number) {
    super(ErrorCodeMap[errorCode], 200);
    this.errorCode = errorCode;
  }


  getErrorCode(): number {
    return this.errorCode;
  }
}
