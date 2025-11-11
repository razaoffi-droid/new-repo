import { AuthService } from './auth.service';
import { LoginDto } from '../../dto/login.dto';
import { RegisterDto } from 'src/user/dto/create-user.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(dto: RegisterDto): Promise<{
        message: string;
        user: {
            id: number;
            email: string;
            phone: string;
            dob: Date;
        };
    }>;
    login(dto: LoginDto): Promise<{
        access_token: string;
        user: import("../../entities/user.entity").User;
    }>;
}
