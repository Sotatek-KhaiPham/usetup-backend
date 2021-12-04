import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity';
import { getRepository } from 'typeorm';
import { InfoLogin } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async login(infoLogin: InfoLogin) {
    try {
      const { username, password } = infoLogin;

      const user = await getRepository(User)
        .createQueryBuilder('userQuery')
        .where(
          'userQuery.email = :username OR userQuery.phone = :username OR userQuery.username = :username',
          { username },
        )
        .getOne();
      if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
          const { password, ...result } = user;
          const payload = { username: user.username, userId: user.id };
          const access_token = await this.jwtService.sign(payload);
          return { user: { ...result }, access_token };
        }
      }
      return { code: 404 };
    } catch (error) {
      return error;
    }
  }
  async reAuth(token: string) {
    try {
      const { userId } = await this.jwtService.verify(token);

      const user = await getRepository(User)
        .createQueryBuilder('userQuery')
        .where('userQuery.id = :userId', { userId })
        .getOne();
      return user;
    } catch (error) {
      return { status: 400, message: 'Authentication Failed!' };
    }
  }
}
