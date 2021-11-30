import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { loginUserDto } from './dto/loginUser.dto';
import { validate } from 'class-validator';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private user: Repository<User>,
  ) {}

  async create(formData: CreateUserDto) {
    try {
      const errors = await validate(formData);
      console.log(errors);
      if (errors.length > 0) {
        throw new Error(`Validation failed!`);
      } else {
        const { password } = formData;
        const saltOrRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltOrRounds);
        formData.password = passwordHash;
        const userNew = await this.user.create(formData);
        const user = await this.user.save(userNew);
        return user;
      }
    } catch (error) {
      return error.message;
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
