import { StatusCode, StatusMessage } from "./Error.StatusCode";

export class SuccessResponse {
  message: string;
  statusCode?: number;
  reasonStatusCode?: string;
  metadata: {};
  constructor({
    message = "",
    statusCode = StatusCode.CREATED,
    reasonStatusCode = StatusMessage.CREATED,
    metadata = {},
  }) {
    this.message = !message ? reasonStatusCode : message;
    this.statusCode = statusCode;
    this.reasonStatusCode = reasonStatusCode;
    this.metadata = metadata;
  }

  send(res: any, headers = {}) {
    return res.status(this.statusCode).json(this);
  }
}

export class Ok extends SuccessResponse {
  constructor({ message = "", metadata = {} }) {
    super({ message, metadata });
  }
}

export class Created extends SuccessResponse {
  constructor({
    message = "",
    statusCode = StatusCode.CREATED,
    reasonStatusCode = StatusMessage.CREATED,
    metadata = {},
  }) {
    super({ message, statusCode, reasonStatusCode, metadata });
  }
}
