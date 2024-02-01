import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { IUser } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    create(data: CreateUserDto): Promise<IUser>;
}
