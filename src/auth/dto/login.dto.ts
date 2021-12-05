import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, Length } from 'class-validator';

export class InfoLogin {
  @IsString()
  @Length(6, 50)
  username: string;
  @Length(6, 100)
  password: any;
}
