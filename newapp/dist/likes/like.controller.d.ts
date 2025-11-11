import { LikeService } from './like.service';
export declare class LikeController {
    private readonly likeService;
    constructor(likeService: LikeService);
    likePost(postId: number, req: any): Promise<import("./like.entity").Like | {
        message: string;
    }>;
    unlikePost(postId: number, req: any): Promise<{
        message: string;
    }>;
}
