import { IsEmail, IsNotEmpty, IsPhoneNumber, Length, Matches } from "class-validator"


const MIN_NAME = 6
const MAX_NAME = 30

export class UserRequest {
  @IsNotEmpty({ message: '请输入用户名' })
  @Length(MIN_NAME, MAX_NAME, {
    message: `用户名长度为 ${MIN_NAME} 至 ${MAX_NAME}`
  })
  userName: string

  @IsEmail(
    { allow_ip_domain: false }, // 为 true ，则验证器将允许主机部分中的IP地址
    {
      message: '输入一个有效的电子邮件地址.'
    }
  )
  email: string

  @IsNotEmpty({ message: 'Informe uma senha.' })
  @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/, {
    message:
      '至少8个字符，至少包含一个数字，一个特殊字符，一个大写字母和一个小写字母',
  })
  password: string;

  @IsPhoneNumber('CN', {
    message: '请输入有效的电话号码(中国)'
  })
  phone: string

  roles: string
}