import { IsString } from 'class-validator';

export class InfoLogin {
  @IsString()
  username: string;
  @IsString()
  password: string;
}
