import { User } from 'src/user/entities/user.entity';
import { Comment } from 'src/comments/comment.entity';
import { Like } from 'src/likes/like.entity';
export declare class Post {
    id: number;
    title: string;
    content: string;
    user: User;
    comments: Comment[];
    likes: Like[];
    createdAt: Date;
    updatedAt: Date;
}
