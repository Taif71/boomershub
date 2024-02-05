import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { UsersService } from './users/users.service';
import { CreateUserDto } from './users/dto/create-user.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(): Promise<string> {    
    return this.appService.getHello();
  }

  @Get('test')
  async getHello2(): Promise<string> {
    return await this.appService.getHello();
  }
}
