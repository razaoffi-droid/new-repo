import { Post } from 'src/posts/entities/post.entity';
import { Comment } from 'src/comments/comment.entity';
import { Follow } from 'src/follows/follwos.entity';
import { Like } from 'src/likes/like.entity';
export declare class User {
    id: number;
    email: string;
    password: string;
    phone: string;
    dob: Date;
    posts: Post[];
    comments: Comment[];
    likes: Like[];
    following: Follow[];
    followers: Follow[];
}
