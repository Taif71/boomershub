import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IUser } from './interfaces/user.interface';

@ApiTags('Create-User')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @ApiOperation({ summary: 'User creation' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return user creation information.',
  })
  @Post()
  public create(@Body() createUserDto: CreateUserDto): any {
    return this.usersService.create(createUserDto);
  }
}
