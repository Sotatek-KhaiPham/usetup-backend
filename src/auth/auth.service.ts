import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity';
import { getRepository } from 'typeorm';
import { InfoLogin } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService
  ) { }

  async login(infoLogin: InfoLogin) {
    try {
      const { email, phone, username, password } = infoLogin

      const user = await getRepository(User)
        .createQueryBuilder("userQuery")
        .where("userQuery.email = :email OR userQuery.phone = :phone OR userQuery.username = :username", { email, phone, username })
        .getOne();
      if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
          const payload = { username: user.username, sub: user.id };
          const { password, ...result } = user;
          const access_token = await this.jwtService.sign(payload);
          console.log(access_token)
          return { ...result, access_token }
        }
      }
      return { code: 404 };
    } catch (error) {
      return error
    }
  }
  async reAuth(token: string) {

    const user = await this.jwtService.verify(token);
    console.log(user)
  }

}
