import { Repository } from 'typeorm';
import { RegisterDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
export declare class UserService {
    private readonly repo;
    constructor(repo: Repository<User>);
    create(dto: RegisterDto): Promise<Omit<User, 'password'>>;
    findById(id: number): Promise<Omit<User, 'password'>>;
    findAll(): Promise<Omit<User, 'password'>[]>;
    findByEmail(email: string): Promise<User | null>;
    update(id: number, dto: UpdateUserDto): Promise<Omit<User, 'password'>>;
    remove(id: number): Promise<void>;
    getUserDashboard(userId: number): Promise<{
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
}
