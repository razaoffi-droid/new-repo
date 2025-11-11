import { Controller, Post, Delete, Param, Req, UseGuards } from '@nestjs/common';
// import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { LikeService } from './like.service';

@Controller('likes')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

//   @UseGuards(JwtAuthGuard)
  @Post(':postId')
  async likePost(@Param('postId') postId: number, @Req() req) {
    const userEmail = req.user.email; // ✅ get from token
    return this.likeService.likePost(postId, userEmail);
  }

//   @UseGuards(JwtAuthGuard)
  @Delete(':postId')
  async unlikePost(@Param('postId') postId: number, @Req() req) {
    const userEmail = req.user.email; // ✅ get from token
    return this.likeService.unlikePost(postId, userEmail);
  }
}
