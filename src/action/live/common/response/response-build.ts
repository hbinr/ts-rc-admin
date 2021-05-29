import ApiResult from "./response"
import ResultMsg from '@common/constant/result-msg';

export default class ApiResultBuild {

  successNoData<T>(code: number): ApiResult<T> {
    let result: ApiResult<T> = new ApiResult()
    result.setCode(code)
    result.setMsg(ResultMsg.get(code))
    return result
  }

  success<T>(t: T, code: number): ApiResult<T> {
    let result: ApiResult<T> = new ApiResult()
    result.setCode(code)
    result.setMsg(ResultMsg.get(code))
    result.setData(t)
    return result
  }

  fail<T>(code: number): ApiResult<T> {
    let result: ApiResult<T> = new ApiResult()
    result.setCode(code)
    result.setMsg(ResultMsg.get(code))
    return result
  }
}