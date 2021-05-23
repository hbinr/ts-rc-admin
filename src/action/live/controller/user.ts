import { Get, JsonController } from "@blued-core/http-server";
import { initDB } from "src/study/sequelize/01-init-db";
import { User, User2, UserInfo } from "src/study/sequelize/02-model-define";
import { queryData, UserCURD } from "src/study/sequelize/03-curd";

@JsonController('/user')
export default class {
  @Get('/get')
  get() {
    initDB()
    // UserCURD()
    return queryData()
  }
}