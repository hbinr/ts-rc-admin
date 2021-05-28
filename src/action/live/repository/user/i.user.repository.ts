import User from "@model/User";

export interface UserRepository {
  isUserNameExist(userName: string): Promise<boolean>;
  isEmailExist(email: string): Promise<boolean>;
  isPhoneExist(phone: string): Promise<boolean>;
  findByID(id: number): Promise<User>;
}
