import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  lastName?: string;
  @IsString()
  username: string;
  @IsString()
  firstName?: string;
  @IsString()
  phone?: string;
  @IsString()
  avatarUrl?: string;
  @IsEmail()
  email: string;
  @IsString()
  password: string;
}
