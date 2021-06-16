import { ResultCode } from "@common/constant";
import { BasicException } from "./basic.error";


export class UserException extends BasicException {
  constructor(code: number = ResultCode.UNKNOWN, detail: string = '') {
    super(code, detail);
    this.check(code, detail);
  }
}