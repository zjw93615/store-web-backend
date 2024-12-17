import { IsString, IsNotEmpty, IsEmail, IsNumber } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty({ message: '账号不能为空' })
  @IsString({ message: '账号必须为string类型'})
  username: string

  @ApiProperty()
  @IsNotEmpty({ message: '密码不能为空' })
  @IsString({ message: '密码必须为string类型'})
  password: string

  @ApiProperty()
  @IsNotEmpty({ message: '确认密码不能为空' })
  confirmPassword: string

  @ApiProperty()
  @IsNotEmpty({ message: '邮箱不能为空' })
  @IsString({ message: '邮箱必须为string类型'})
  @IsEmail()
  email: string

  @ApiProperty()
  @IsNotEmpty({ message: '验证码不能为空' })
  code: string

}
