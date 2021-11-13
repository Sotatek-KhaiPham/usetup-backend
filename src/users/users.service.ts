import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { loginUserDto } from './dto/LoginUser.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private user: Repository<User>,
  ) { }
  async create(createUserDto: CreateUserDto) {
    try {
      const { password } = createUserDto;
      const saltOrRounds = 10;
      const passwordHash = await bcrypt.hash(password, saltOrRounds);
      createUserDto.password = passwordHash
      const userNew = await this.user.create(createUserDto);
      const user = await this.user.save(userNew);
      return user;
    } catch (error) {
      return error.message
    }
  }

  async login(loginUser: loginUserDto) {
    try {
      const { email, phone, username, password } = loginUser;

      const user = await getRepository(User)
        .createQueryBuilder("userQuery")
        .where("userQuery.email = :email OR userQuery.phone = :phone OR userQuery.username = :username", { email, phone, username })
        .getOne();

      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const { password, ...result } = user;
        return result
      }
      return null;

    } catch (error) {

    }
  }
  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
