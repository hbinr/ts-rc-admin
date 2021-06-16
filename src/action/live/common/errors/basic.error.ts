import ResultMsg from '@common/constant/result-msg';
import { ResultCode } from '@common/constant/result-code';

export class BasicException extends Error {
  protected code: number = ResultCode.UNKNOWN;
  protected msg: string | undefined = '';
  protected detail: string = '';

  /**
   * 构造器函数 如果子类继承了该基类，请在子类构造器中依次执行
   * super()、this.appendMap(map)、this.check(code,detail,httpCode)
   * @param code 业务状态码
   * @param detail 错误明细
   */
  constructor(code: number = ResultCode.UNKNOWN, detail: string = '') {
    super();
    this.check(code, detail);
  }


  /**
   * 检查错误码是否存在,存在提取错误状态码明细并赋值,如果不存在,则为未处理的错误。
   * 如果是子类，请在构造器中执行super()、super.setMap(map)后调用
   * @param code 业务状态码
   * @param detail 错误明细
   * @param httpCode 请求状态码
   */
  protected check(
    code: number = ResultCode.UNKNOWN,
    detail: string = ''
  ) {
    this.detail = detail;
    this.code = code;
    this.msg = ResultMsg.get(code)

  }

  /**
   * 获取错误状态码
   */
  public getCode() {
    return this.code;
  }

  //获取错误码中文描述
  public getMsg() {
    return this.msg;
  }

  //获取错误明细(错误明细是抛出错误时手动传入的)
  public getDetail() {
    return this.detail;
  }


  /**
   * 转字符串
   */
  public toString() {
    return `code:${this.code},msg:${this.msg},detail:${this.detail}`;
  }
}