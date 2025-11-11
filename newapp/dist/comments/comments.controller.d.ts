import { CommentsService } from './comments.service';
export declare class CommentsController {
    private readonly commentsService;
    constructor(commentsService: CommentsService);
    createComment(postId: number, text: string, req: any): Promise<import("./comment.entity").Comment>;
    getComments(postId: number, req: any): Promise<import("./comment.entity").Comment[]>;
}
