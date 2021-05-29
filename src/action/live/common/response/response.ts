export default class AppResult<T>{
  private code: number
  private msg: string
  private data: T

  public getCode(): number {
    return this.code;
  }

  public setCode(code: number): void {
    this.code = code;
  }

  public getMsg(): string {
    return this.msg;
  }

  public setMsg(msg: string): void {
    this.msg = msg;
  }

  public getData(): T {
    return this.data;
  }

  public setData(data: T): void {
    this.data = data;
  }
}

