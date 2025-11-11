import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Like } from './like.entity';
import { Post } from 'src/posts/entities/post.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(Like)
    private readonly likeRepo: Repository<Like>,
    
    @InjectRepository(Post)
    private readonly postRepo: Repository<Post>,

 
  ) {}

  // ✅ Like a post
  async likePost(postId: number, userEmail: string) {
    console.log('✅ Like request for postId:', postId, 'by user:', userEmail);

    const post = await this.postRepo.findOne({ where: { id: postId } });
    if (!post) throw new NotFoundException('Post not found');

    // check if user already liked
    const existing = await this.likeRepo.findOne({
      where: { post: { id: postId }, userEmail },
    });

    if (existing) {
      console.log('⚠️ Already liked');
      return { message: 'Already liked' };
    }

    // ✅ create and save new like
    const like = this.likeRepo.create({
      userEmail, // ✅ this was missing
      post,
    });

    const saved = await this.likeRepo.save(like);
    console.log('❤️ Like saved successfully:', saved);
    return saved;
  }

  // ✅ Unlike a post
  async unlikePost(postId: number, userEmail: string) {
    console.log('💔 Unlike request for postId:', postId, 'by user:', userEmail);

    const existing = await this.likeRepo.findOne({
      where: { post: { id: postId }, userEmail },
    });

    if (!existing) {
      throw new NotFoundException('Like not found for this user/post');
    }

    await this.likeRepo.remove(existing);
    console.log('🗑️ Like removed successfully');
    return { message: 'Unliked successfully' };
  }

  // ✅ Get all likes for a post
  async getLikes(postId: number) {
    const likes = await this.likeRepo.find({
      where: { post: { id: postId } },
    });
    return likes;
  }
  
}
