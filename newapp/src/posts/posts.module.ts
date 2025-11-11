
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { User } from '../user/entities/user.entity';
import { Like } from 'src/likes/like.entity';
import { Follow } from 'src/follows/follwos.entity';
import { PostController } from './posts.controller';
import { PostService } from './posts.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([Post, User, Like, Follow]), // ✅ Add Like here
  ],
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService],
})
export class PostModule {}

