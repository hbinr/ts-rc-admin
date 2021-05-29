import AppResult from "./response"
import ResultMsg from '@common/constant/result-msg';

export default class AppResultBuild {

  successNoData<T>(code: number): AppResult<T> {
    let result: AppResult<T> = new AppResult()
    result.setCode(code)
    result.setMsg(ResultMsg.get(code))
    return result
  }

  success<T>(t: T, code: number): AppResult<T> {
    let result: AppResult<T> = new AppResult()
    result.setCode(code)
    result.setMsg(ResultMsg.get(code))
    result.setData(t)
    console.log('ResultMsg.get(code): ', ResultMsg.get(code));
    return result
  }

  fail<T>(code: number): AppResult<T> {
    let result: AppResult<T> = new AppResult()
    result.setCode(code)
    result.setMsg(ResultMsg.get(code))
    console.log('ResultMsg.get(code): ', ResultMsg.get(code));
    return result
  }
}