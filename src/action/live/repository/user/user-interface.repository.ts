import User from "@model/User";
export interface IUserRepository {

  create(user: User): Promise<void>
  findAll(): Promise<User[]>
  findByID(id: number): Promise<User>

}
