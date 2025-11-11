import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostService } from './posts.service';
import { Request } from 'express';
interface AuthenticatedRequest extends Request {
    user?: {
        id: number;
        email: string;
        sub?: number;
    };
}
export declare class PostController {
    private readonly postService;
    constructor(postService: PostService);
    create(dto: CreatePostDto, req: AuthenticatedRequest): Promise<import("./entities/post.entity").Post>;
    getMyPosts(req: AuthenticatedRequest): Promise<any[]>;
    findAll(userId?: number): Promise<any[]>;
    findOne(id: number): Promise<import("./entities/post.entity").Post>;
    update(id: number, dto: UpdatePostDto, req: AuthenticatedRequest): Promise<import("./entities/post.entity").Post>;
    remove(id: number, req: AuthenticatedRequest): Promise<{
        message: string;
    }>;
}
export {};
