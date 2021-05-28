import { HttpStatus } from "@common/http/http-status";

export class HttpStatusError extends Error {
  status: HttpStatus;
  constructor(
    status: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR,
    message?: string,
  ) {
    super(message);
    this.status = status;
    Object.setPrototypeOf(this, HttpStatusError.prototype);
  }
}
