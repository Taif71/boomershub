import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { JwtPayload } from './interfaces/jwt.payload';
import { AuthDTO } from './dto/auth.dto';
export declare class AuthService {
    private userRepository;
    private readonly jwtService;
    constructor(userRepository: Repository<User>, jwtService: JwtService);
    private validate;
    login(loginDto: AuthDTO): Promise<any | {
        status: number;
        message: string;
    }>;
    validateUserByJwt(payload: JwtPayload): Promise<{
        expiresIn: number;
        token: string;
    }>;
    protected createJwtPayload(user: any): {
        expiresIn: number;
        token: string;
    };
}
