import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { User } from 'src/user/entities/user.entity';
import { Post } from 'src/posts/entities/post.entity';
export declare class CommentsService {
    private readonly commentRepo;
    private readonly postRepo;
    private readonly userRepo;
    constructor(commentRepo: Repository<Comment>, postRepo: Repository<Post>, userRepo: Repository<User>);
    create(text: string, postId: number, userId: number): Promise<Comment>;
    getCommentsByPost(postId: number, userId: number): Promise<Comment[]>;
}
