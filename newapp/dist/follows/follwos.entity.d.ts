import { User } from 'src/user/entities/user.entity';
export declare class Follow {
    id: number;
    follower: User;
    following: User;
    createdAt: Date;
}
