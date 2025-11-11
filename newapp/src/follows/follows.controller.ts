import { Controller, Post, Param, Get, UseGuards, Req, Delete } from '@nestjs/common';
import type { Request } from 'express';
import { FollowService } from './follows.service';

@Controller('follow')
export class FollowController {
  constructor(private readonly followService: FollowService) {}

//   @UseGuards(JwtAuthGuard)
  @Post(':id')
  async followUser(@Param('id') followingId: number, @Req() req: Request) {
  const followerId = (req.user as any).id;
    return this.followService.followUser(followerId, followingId);
  }

  @Get(':id/followers')
  async getFollowers(@Param('id') id: number) {
    return this.followService.getFollowers(id);
  }

  @Get(':id/following')
  async getFollowing(@Param('id') id: number) {
    return this.followService.getFollowing(id);
  }

//   @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async unfollowUser(@Param('id') followingId: number, @Req() req: Request) {
  const followerId = (req.user as any).id;
    return this.followService.unfollowUser(followerId, followingId);
  }
}
