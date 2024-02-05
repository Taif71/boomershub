import { Injectable } from '@nestjs/common';
import "reflect-metadata"
import { UsersService } from './users/users.service';
import { CreateUserDto } from './users/dto/create-user.dto';

@Injectable()
export class AppService {
  constructor(private readonly usersService: UsersService) {}

  async getHello(): Promise<string> {
    const payload: CreateUserDto = {
      email: "career@boomershub.com",
      password: "123456",
      firstName: '',
      lastName: ''
    }
    await this.usersService.create(payload)
    return 'Hello World!';
  }
}
