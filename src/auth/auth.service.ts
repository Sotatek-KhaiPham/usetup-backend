import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { validate } from 'class-validator';
import { CreateUserDto } from 'src/models/users/dto/create-user.dto';
import { User } from 'src/models/users/entities/user.entity';
import { getRepository, Repository } from 'typeorm';
import { InfoLogin } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private user: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async login(infoLogin: InfoLogin) {
    const { username, password } = infoLogin;
    const user = await getRepository(User)
      .createQueryBuilder('userQuery')
      .where(
        'userQuery.email = :username OR userQuery.phone = :username OR userQuery.username = :username',
        { username },
      )
      .getOne();
    if (!user) {
      return { status: 401, message: 'Authentication Failed!' };
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return { status: 401, message: 'Authentication Failed!' };
    }
    if (isMatch) {
      const { password, ...result } = user;
      const payload = { username: user.username, userId: user.id };
      const access_token = await this.jwtService.sign(payload);

      if (!user.isActive)
        return { status: 403, message: 'Account not active!' };

      return { user: { ...result }, access_token };
    }
  }
  async reAuth(token: string) {
    try {
      const { userId } = await this.jwtService.verify(token);

      const user = await getRepository(User)
        .createQueryBuilder('userQuery')
        .where('userQuery.id = :userId', { userId })
        .getOne();
      if (!user) {
        return { status: 401, message: 'Authentication Failed!' };
      }
      if (!user.isActive)
        return { status: 403, message: 'Account not active!' };

      return user;
    } catch (error) {
      return { status: 401, message: 'Authentication Failed!' };
    }
  }
  async register(formData: CreateUserDto) {
    try {
      const { password } = formData;
      const saltOrRounds = 10;
      const passwordHash = await bcrypt.hash(password, saltOrRounds);
      formData.password = passwordHash;
      const userNew = await this.user.create(formData);
      const user = await this.user.save(userNew);
      return user;
    } catch (error) {
      return error.message;
    }
  }
}
