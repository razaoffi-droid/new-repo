import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../user.service';
import { RegisterDto } from '../../dto/create-user.dto';
import { LoginDto } from '../../dto/login.dto';
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    login(dto: LoginDto): Promise<{
        access_token: string;
        user: import("../../entities/user.entity").User;
    }>;
    register(dto: RegisterDto): Promise<{
        message: string;
        user: {
            id: number;
            email: string;
            phone: string;
            dob: Date;
        };
    }>;
}
