import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/models/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { InfoLogin } from './dto/login.dto';

@ApiTags('authorization')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() infoLogin: InfoLogin) {
    return this.authService.login(infoLogin);
  }

  @ApiBearerAuth('access-token')
  @Post('/reauth')
  async reAuth(@Headers() header: any) {
    const [scheme, token] = header.authorization.split(' ');
    return this.authService.reAuth(token);
  }
  @Post('/register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }
}
