import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  lastName: string;
  @ApiProperty()
  firstName: string;
  @ApiProperty()
  phone: string;
  @ApiProperty()
  avatarUrl: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
}
