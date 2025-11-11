import { UserService } from './user.service';
import { RegisterDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(dto: RegisterDto): Promise<Omit<import("./entities/user.entity").User, "password">>;
    getProfile(req: any): Promise<{
        id: number;
        email: string;
        phone: string;
        dob: Date;
        followersCount: number;
        followingCount: number;
        posts: {
            id: number;
            title: string;
            content: string;
            likesCount: number;
            likedByUser: boolean;
            comments: {
                userEmail: string;
                text: string;
            }[];
        }[];
    }>;
    findByEmail(email: string): Promise<void>;
    update(id: number, dto: UpdateUserDto): Promise<Omit<import("./entities/user.entity").User, "password">>;
    findAll(): Promise<Omit<import("./entities/user.entity").User, "password">[]>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
