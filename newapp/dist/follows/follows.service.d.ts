import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Follow } from './follwos.entity';
export declare class FollowService {
    private readonly followRepo;
    private readonly userRepo;
    constructor(followRepo: Repository<Follow>, userRepo: Repository<User>);
    followUser(followerId: number, followingId: number): Promise<{
        message: string;
    }>;
    getFollowers(userId: number): Promise<User[]>;
    getFollowing(userId: number): Promise<User[]>;
    unfollowUser(followerId: number, followingId: number): Promise<{
        message: string;
    }>;
}
