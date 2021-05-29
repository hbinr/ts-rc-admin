import { ResultCode } from './result-code';

let ResultMsg = new Map()

/* 参数错误：10001-19999 */
ResultMsg.set(ResultCode.SUCCESS, '成功')
ResultMsg.set(ResultCode.PARAM_IS_INVALID, '参数无效')
ResultMsg.set(ResultCode.PARAM_IS_BLANK, '参数为空')
ResultMsg.set(ResultCode.PARAM_TYPE_BIND_ERROR, '参数类型错误')
ResultMsg.set(ResultCode.PARAM_NOT_COMPLETE, '参数缺失')


/* 用户错误：20001-29999*/
ResultMsg.set(ResultCode.USER_NOT_LOGGED_IN, '用户未登录')
ResultMsg.set(ResultCode.USER_LOGIN_ERROR, '账号不存在或密码错误')
ResultMsg.set(ResultCode.USER_ACCOUNT_FORBIDDEN, '账号已被禁用')
ResultMsg.set(ResultCode.USER_NOT_EXIST, '用户不存在')
ResultMsg.set(ResultCode.USER_HAS_EXISTED, '用户已存在')
ResultMsg.set(ResultCode.USER_ACCOUNT_LEN, '账号长度不符合要求')
ResultMsg.set(ResultCode.USER_PASSWORD_LEN, '密码长度不符合要求')
ResultMsg.set(ResultCode.USER_EMAIL_HAS_EXISTED, '邮箱已存在')
ResultMsg.set(ResultCode.USER_PHONE_HAS_EXISTED, '手机已存在')


/* 系统错误：40001-49999 */
ResultMsg.set(ResultCode.SYSTEM_INNER_ERROR, '系统繁忙，请稍后重试')


export default ResultMsg