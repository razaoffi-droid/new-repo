import type { Request } from 'express';
import { FollowService } from './follows.service';
export declare class FollowController {
    private readonly followService;
    constructor(followService: FollowService);
    followUser(followingId: number, req: Request): Promise<{
        message: string;
    }>;
    getFollowers(id: number): Promise<import("../user/entities/user.entity").User[]>;
    getFollowing(id: number): Promise<import("../user/entities/user.entity").User[]>;
    unfollowUser(followingId: number, req: Request): Promise<{
        message: string;
    }>;
}
