import {
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserDTO } from './dto/user.dto';
const bcrypt = require("bcrypt")
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  /**
     * Constructor
     * @param {Repository<User>} userRepository
     */
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  /**
   * Create a profile with RegisterPayload fields
   * @param {CreateUserDto} data user payload
   * @returns {Promise<IUser>} created user data
   */
  async create(data: CreateUserDto): Promise<any> {
    try {
      const userDTO = new UserDTO();
      userDTO.email = data.email.toLowerCase();

      userDTO.password = await this.hashPassword(data.password) as any;

      if (
        data.hasOwnProperty('firstName') &&
        data.firstName
      ) {
        userDTO.firstName = data.firstName;
      }

      if (
        data.hasOwnProperty('lastName') &&
        data.lastName
      ) {
        userDTO.lastName = data.lastName;
      }

      const user = await this.userRepository.save(userDTO);

      return UserDTO.fromEntity(user);
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  private hashPassword = async (password: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          reject(err);
        } else {
          resolve(hash);
        }
      });
    });
  }
}