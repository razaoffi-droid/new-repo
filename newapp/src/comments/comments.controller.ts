import {Controller,Post,Body,Param,Get,UseGuards,Request} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { JwtAuthGuard } from 'src/user/auth/auth/jwt-auth.guard';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  /**
   * ✅ Create a new comment on a post
   * Requires JWT token
   */
  // @UseGuards(JwtAuthGuard)
  @Post(':postId')
  async createComment(
    @Param('postId') postId: number,
    @Body('text') text: string,
    @Request() req,
  ) {
    const userId = req.user?.id;
    console.log('🟢 Create Comment Request:', { userId, postId, text });
    const newComment = await this.commentsService.create(text, postId, userId);
    console.log('✅ Comment Created Successfully:', newComment);
    return newComment;
  }

  /**
   * ✅ Get all comments for a specific post
   * Requires JWT token
   */
  // @UseGuards(JwtAuthGuard)
  @Get(':postId')
  async getComments(@Param('postId') postId: number, @Request() req) {
    const userId = req.user?.id;
    console.log('🟢 Get Comments Request:', { userId, postId });
    const comments = await this.commentsService.getCommentsByPost(postId, userId);
    console.log(`✅ Found ${comments.length} comment(s) for Post ID ${postId}`);
    return comments;
  }
}
