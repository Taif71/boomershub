import { AuthService } from './auth.service';
import { AuthDTO } from './dto/auth.dto';
import { IUser } from '../users/interfaces/user.interface';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(res: any, loginDto: AuthDTO): Promise<IUser>;
}
