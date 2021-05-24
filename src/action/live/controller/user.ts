import { Get, JsonController } from "@blued-core/http-server";
import { initDB } from "src/study/sequelize/01-init-db";
import { User, User2, UserInfo } from "src/study/sequelize/02-model-define";
import { queryData, UserCURD } from "src/study/sequelize/03-curd";
import { UserOrderAndGroup } from "src/study/sequelize/04-order-group-limit";
import { Finders } from "src/study/sequelize/05-finders";

@JsonController('/user')
export default class {
  @Get('/get')
  get() {
    initDB()
    // UserCURD()
    // queryData()
    // UserOrderAndGroup 
    return Finders()
  }
}