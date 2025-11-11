import { Repository } from 'typeorm';
import { Like } from './like.entity';
import { Post } from 'src/posts/entities/post.entity';
export declare class LikeService {
    private readonly likeRepo;
    private readonly postRepo;
    constructor(likeRepo: Repository<Like>, postRepo: Repository<Post>);
    likePost(postId: number, userEmail: string): Promise<Like | {
        message: string;
    }>;
    unlikePost(postId: number, userEmail: string): Promise<{
        message: string;
    }>;
    getLikes(postId: number): Promise<Like[]>;
}
