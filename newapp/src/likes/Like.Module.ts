import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikeService } from './like.service';
import { LikeController } from './like.controller';
import { Like } from './like.entity';
import { Post } from 'src/posts/entities/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Like, Post])],
  providers: [LikeService],
  controllers: [LikeController],
  exports: [TypeOrmModule],
})
export class LikeModule {}



