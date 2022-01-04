import { IsEmail, IsString } from 'class-validator';

export class loginUserDto {
  @IsEmail()
  email?: string;
  @IsString()
  phone?: string;
  @IsString()
  username?: string;
  @IsString()
  password: string;
}
