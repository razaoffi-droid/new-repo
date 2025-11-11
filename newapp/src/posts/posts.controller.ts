import {Controller,Get,Post as HttpPost,Body,Param,Put,Delete,ParseIntPipe,Req,UnauthorizedException, Query} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtAuthGuard } from 'src/user/auth/auth/jwt-auth.guard';
import { PostService } from './posts.service';
import { Request } from 'express';

// ✅ Extend Express Request to include `user` from JWT
interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
    email: string;
    sub?: number;
  };
}

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}


  //  ✅ Create a new post (requires JWT token)
  // @UseGuards(JwtAuthGuard)
  @HttpPost()
  async create(@Body() dto: CreatePostDto, @Req() req: AuthenticatedRequest) {
    const user = req.user;
    if (!user) throw new Error('User not found in request');
    console.log('✅ Logged-in user (creating post):', user);
    const payload = {...dto,userId: Number(user.id || user.sub),};
    return this.postService.create(payload);
  }

  
  //  ✅ Get all posts of the logged-in user (via token)

// @UseGuards(JwtAuthGuard)
  @Get('my-posts')
  async getMyPosts(@Req() req: AuthenticatedRequest) {
    const user = req.user;
    if (!user?.id) throw new UnauthorizedException('Invalid token payload');
    console.log('✅ Fetching posts for userId:', user.id);
    const posts = await this.postService.findByUserId(user.id);
    console.log('📤 Found posts:', posts);
    return posts;
  }


  //  ✅ Get all posts (for testing or admin)
  // @Get('all')
  // async findAll() {
  //   return this.postService.findAll();
  // }
  // @UseGuards(AuthGuard)
  // @Get()
  // async findAll(@Req() req) {
  //   const userId = req.user.id;
  //   return this.postService.findAll(userId);
  // }
 @Get()
 async findAll(@Query('userId') userId?: number) {
  return this.postService.findAll(userId);
}

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.postService.findById(id);
  }

  
  //  ✅ Update post by ID
  // @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdatePostDto,
    @Req() req: AuthenticatedRequest,
  ) {
    const user = req.user;
    console.log('User updating post:', user);
    return this.postService.update(id, dto);
  }

  
// ✅ Delete post by ID
  // @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number, @Req() req: AuthenticatedRequest) {
    const user = req.user;
    console.log('User deleting post:', user);
    await this.postService.remove(id);
    return { message: 'Post deleted successfully' };
  }
}
