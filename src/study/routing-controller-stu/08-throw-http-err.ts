/**
 *  throw http错误学习，内容要点: 
 * 1. 通过控制流程中trow 指定错误来作为响应
 * 2. 预置的错误有：
 *      HttpError              自定义 httpcode 和 错误信息
 *      BadRequestError        400  Bad requesst
 *      MethodNotAllowedError  405  请求方法不允许
 *      NotAcceptableError     406  客户端错误，指代服务器端无法提供与  Accept-Charset 以及 Accept-Language 消息头指定的值相匹配的响应
 *      NotFoundError          404  Not found
 *      UnauthorizedError      401  未经授权
 *      ForbiddenError         502  禁止访问
 *      InternalServerError    500  服务端内部错误
 * 
 * 3. 自定义错误步骤：
 *      a. 需要继承HttpError
 *      b. 自定义属性+自定义 constructor()
 *      c. 如果想返回JSON格式数据，可实现一个 toJson 函数定义返回给客户端的数据。
 */

import { Get, HttpError, JsonController, NotFoundError, Param, } from 'routing-controllers';

class DBError extends HttpError {
    public operationName: string;
    public args: any[];

    constructor(operationName: string, args: any[] = []) {
        super(500);
        Object.setPrototypeOf(this, DBError.prototype);
        this.operationName = operationName;
        this.args = args; // 可用于内部log记录
    }

    toJson() {
        return {
            status: this.httpCode,
            failedOperation: this.operationName,
        };
    }
}
@JsonController()
export class UserThrowErrController {
    @Get("/users-http-err/:id")
    getOne(@Param("id") id: number) {
        if (id != 1) {
            // throw new NotFoundError(`User was not found.`); // 404
            throw new DBError('select') // throw 自定义的 error
        }

        return 1
    }
}