import { Controller, Get, Post, Body, Patch, Param, Delete, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';
import { InfoLogin } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Post('/login')
  async login(@Body() infoLogin: InfoLogin) {
    return this.authService.login(infoLogin);
  }

  @Post('/reAuth')
  async reAuth(@Headers() token: any) {
    console.log(token.authorization)
    return this.authService.reAuth(token.authorization);
  }


}
