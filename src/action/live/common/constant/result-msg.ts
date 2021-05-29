import { ResultCode } from './result-code';

let ResultMsg = new Map()

/* 参数错误：10001-19999 */
ResultMsg.set(ResultCode.SUCCESS, '成功')
ResultMsg.set(ResultCode.PARAM_IS_INVALID, '参数无效')
ResultMsg.set(ResultCode.PARAM_IS_BLANK, '参数为空')
ResultMsg.set(ResultCode.PARAM_TYPE_BIND_ERROR, '参数类型错误')
ResultMsg.set(ResultCode.PARAM_NOT_COMPLETE, '参数缺失')

export default ResultMsg