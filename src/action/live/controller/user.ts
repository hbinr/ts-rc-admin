import { Get, JsonController } from "@blued-core/http-server";
import { initDB } from "src/study/sequelize/01-init-db";

@JsonController('/user')
export default class {
  @Get('/get')
  get() {
    console.log(1111111111111);

    initDB()
    return 1
  }
}