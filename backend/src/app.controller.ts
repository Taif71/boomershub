import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { UsersService } from './users/users.service';
import { CreateUserDto } from './users/dto/create-user.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly usersService: UsersService) {}

  @Get()
  async getHello(): Promise<string> {    
    return this.appService.getHello();
  }

  @Get('test')
  async getHello2(): Promise<string> {
    const payload: CreateUserDto = {
      email: "booershub@career.com",
      password: "123456",
      firstName: '',
      lastName: ''
    }
    await this.usersService.create(payload)
    return this.appService.getHello();
  }
}
