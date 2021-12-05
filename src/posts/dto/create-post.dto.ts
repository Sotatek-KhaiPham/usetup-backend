import { IsInt, IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  thumb: string;
  @IsString()
  description: string;
  @IsString()
  title: string;
  @IsInt()
  type: number;
  @IsString()
  user: string;
}
