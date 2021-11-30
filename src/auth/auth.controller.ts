import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { InfoLogin } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() infoLogin: InfoLogin) {
    return this.authService.login(infoLogin);
  }

  
  @Post('/reauth')
  async reAuth(@Headers() header: any) {
    const [scheme, token] = header.authorization.split(' ');
    return this.authService.reAuth(token);
  }
}
