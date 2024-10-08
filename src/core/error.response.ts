import { StatusCode, StatusMessage } from "./Error.StatusCode";

export class ErrorResponse extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class BadRequest extends ErrorResponse {
  constructor(
    message: string = StatusMessage.BAD_REQUEST,
    statusCode: number = StatusCode.BAD_REQUEST
  ) {
    super(message, statusCode);
  }
}

export class UnAuthorized extends ErrorResponse {
  constructor(
    message: string = StatusMessage.UN_AUTHORIZED,
    statusCode: number = StatusCode.UN_AUTHORIZED
  ) {
    super(message, statusCode);
  }
}
