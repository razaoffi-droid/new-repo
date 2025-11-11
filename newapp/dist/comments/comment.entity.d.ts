import { Post } from 'src/posts/entities/post.entity';
import { User } from 'src/user/entities/user.entity';
export declare class Comment {
    id: number;
    text: string;
    post: Post;
    user: User;
    createdAt: Date;
}
