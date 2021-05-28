import { UserDto } from '@dto/user.dto';
import { UserRequest } from "./types";

export interface IUserService {
  createUser(userRequest: UserRequest): Promise<void>

  getUserByID(id: number): Promise<UserDto>
  listUsers(): Promise<UserDto[]>
  isUserNameExist(userName: string): Promise<boolean>;
  isEmailExist(email: string): Promise<boolean>;
  isPhoneExist(phone: string): Promise<boolean>;
}
