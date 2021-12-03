import User from "@model/User";
export interface IUserRepository {
  create(user: User): Promise<void>
  findAll(): Promise<User[]>
  findByID(id: number): Promise<User>
  findByEmail(email: string): Promise<User>
  findByPhone(userName: string): Promise<User>
}
