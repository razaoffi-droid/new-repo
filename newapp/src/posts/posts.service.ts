// import {
//   Injectable,
//   NotFoundException,
//   BadRequestException,
// } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Post } from './entities/post.entity';
// import { CreatePostDto } from './dto/create-post.dto';
// import { UpdatePostDto } from './dto/update-post.dto';
// import { User } from '../user/entities/user.entity';

// @Injectable()
// export class PostService {
//   constructor(
//     @InjectRepository(Post)
//     private readonly postRepo: Repository<Post>,

//     @InjectRepository(User)
//     private readonly userRepo: Repository<User>,
//   ) {}

//   // ✅ Create post for logged-in user
//   async create(dto: any): Promise<Post> {
//     console.log('🟢 Creating Post with DTO:', dto);

//     const user = await this.userRepo.findOne({ where: { id: dto.userId } });
//     if (!user) throw new NotFoundException('User not found');

//     const post = this.postRepo.create({
//       title: dto.title,
//       content: dto.content,
//       user,
//     });

//     const saved = await this.postRepo.save(post);
//     console.log('✅ Post Created Successfully:', saved);
//     return saved;
//   }

//   // ✅ Get all posts (with user and comments)
//   async findAll(): Promise<Post[]> {
//     console.log('📦 Fetching all posts...');
//     const posts = await this.postRepo.find({
//       relations: ['user', 'comments', 'comments.user'],
//       order: { createdAt: 'DESC' },
//     });
//     console.log(`✅ Found ${posts.length} posts`);
//     return posts;
//   }

//   // ✅ Get all posts by a specific user (with comments)
//   async findByUserId(userId: number): Promise<Post[]> {
//     console.log('📦 Fetching posts for userId:', userId);
//     const posts = await this.postRepo.find({
//       where: { user: { id: userId } },
//       relations: ['user', 'comments', 'comments.user'],
//       order: { createdAt: 'DESC' },
//     });

//     if (!posts.length) throw new NotFoundException('No posts found for this user');
//     console.log('📤 Found posts:', posts);
//     return posts;
//   }

//   // ✅ Get single post (with comments)
// async findById(id: number): Promise<Post> {
//   try {
//     const post = await this.postRepo.findOne({
//       where: { id },
//       relations: ['user'],
//     });
//     if (!post) throw new NotFoundException('Post not found');
//     return post;
//   } catch (error) {
//     console.error('❌ Error in findById:', error);
//     throw error;
//   }
// }


//   // ✅ Update post
//   async update(id: number, dto: UpdatePostDto): Promise<Post> {
//     console.log('✏️ Updating post:', id);
//     const post = await this.postRepo.findOne({ where: { id } });
//     if (!post) throw new NotFoundException('Post not found');

//     Object.assign(post, dto);
//     const updated = await this.postRepo.save(post);
//     console.log('✅ Post updated:', updated);
//     return updated;
//   }

//   // ✅ Delete post
//   async remove(id: number): Promise<void> {
//     console.log('🗑️ Deleting post:', id);
//     const result = await this.postRepo.delete(id);
//     if (result.affected === 0) throw new NotFoundException('Post not found');
//     console.log('✅ Post deleted successfully');
//   }
// }


import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { User } from '../user/entities/user.entity';
import { Like } from 'src/likes/like.entity';
import { UpdatePostDto } from './dto/update-post.dto';
import { Follow } from 'src/follows/follwos.entity';


@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepo: Repository<Post>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,

    @InjectRepository(Like)
    private readonly likeRepo: Repository<Like>,

    @InjectRepository(Follow)
    private readonly followRepo: Repository<Follow>,
  ) {}

  // ✅ Create post
  async create(dto: any): Promise<Post> {
    const user = await this.userRepo.findOne({ where: { id: dto.userId } });
    if (!user) throw new NotFoundException('User not found');

    const post = this.postRepo.create({
      title: dto.title,
      content: dto.content,
      user,
    });
    return this.postRepo.save(post);
  }

  // ✅ Get all posts (with user context)
  async findAll(currentUserId?: number): Promise<any[]> {
    const posts = await this.postRepo.find({
      relations: ['user', 'comments', 'comments.user', 'likes'],
      order: { createdAt: 'DESC' },
    });

    const result = await Promise.all(
      posts.map(async (post) => {
        const likesCount = post.likes.length;
        const isLikedByUser = post.likes?.some(
        (like) => like.user && like.user.id === currentUserId,
        ) || false;


        const isFollowingUser = await this.followRepo.findOne({
          where: {
            follower: { id: currentUserId },
            following: { id: post.user.id },
          },
        });

        return {
          id: post.id,
          title: post.title,
          content: post.content,
          imageUrl: post['imageUrl'] || null,
          createdAt: post.createdAt,
          userEmail: post.user.email,
          likesCount,
          isLikedByUser,
          isFollowingUser: !!isFollowingUser,
          comments: post.comments.map((c) => ({
            userEmail: c.user.email,
            text: c.text,
          })),
        };
      }),
    );

    return result;
  }

  // ✅ Get posts by logged-in user
  async findByUserId(userId: number): Promise<any[]> {
    const posts = await this.postRepo.find({
      where: { user: { id: userId } },
      relations: ['user', 'comments', 'comments.user', 'likes'],
      order: { createdAt: 'DESC' },
    });

    return posts.map((post) => ({
      id: post.id,
      title: post.title,
      content: post.content,
      userEmail: post.user.email,
      likesCount: post.likes.length,
      comments: post.comments.map((c) => ({
        userEmail: c.user.email,
        text: c.text,
      })),
    }));
  }

  async findById(id: number): Promise<Post> {
    const post = await this.postRepo.findOne({
      where: { id },
      relations: ['user', 'comments', 'comments.user', 'likes'],
    });
    if (!post) throw new NotFoundException('Post not found');
    return post;
  }

   // ✅ Update post
  async update(id: number, dto: UpdatePostDto): Promise<Post> {
    console.log('✏️ Updating post:', id);
    const post = await this.postRepo.findOne({ where: { id } });
    if (!post) throw new NotFoundException('Post not found');

    Object.assign(post, dto);
    const updated = await this.postRepo.save(post);
    console.log('✅ Post updated:', updated);
    return updated;
  }

  // ✅ Delete post
  async remove(id: number): Promise<void> {
    console.log('🗑️ Deleting post:', id);
    const result = await this.postRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException('Post not found');
    console.log('✅ Post deleted successfully');
  }
}
