import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { User } from 'src/user/entities/user.entity';
import { Post } from 'src/posts/entities/post.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepo: Repository<Comment>,

    @InjectRepository(Post)
    private readonly postRepo: Repository<Post>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  /**
   * ✅ Create a new comment
   */
  async create(text: string, postId: number, userId: number): Promise<Comment> {
    console.log('📩 Creating comment...', { text, postId, userId });

    // 🔹 Check if post exists
    const post = await this.postRepo.findOne({ where: { id: postId } });
    if (!post) {
      console.error('❌ Post not found:', postId);
      throw new NotFoundException('Post not found');
    }

    // 🔹 Check if user exists
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) {
      console.error('❌ User not found:', userId);
      throw new NotFoundException('User not found');
    }

    // 🔹 Create and save comment
    const comment = this.commentRepo.create({ text, post, user });
    const savedComment = await this.commentRepo.save(comment);

    console.log('✅ Comment saved successfully:', savedComment);
    return savedComment;
  }

  /**
   * ✅ Get all comments for a specific post
   */
  async getCommentsByPost(postId: number, userId: number): Promise<Comment[]> {
    console.log('📩 Fetching comments for post...', { postId, userId });

    const post = await this.postRepo.findOne({
      where: { id: postId },
      relations: ['comments', 'comments.user'],
    });

    if (!post) {
      console.error('❌ Post not found:', postId);
      throw new NotFoundException('Post not found');
    }

    console.log(`✅ Found ${post.comments.length} comments for Post ID ${postId}`);
    return post.comments;
  }
}
