import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { User } from '../user/entities/user.entity';
import { Like } from 'src/likes/like.entity';
import { UpdatePostDto } from './dto/update-post.dto';
import { Follow } from 'src/follows/follwos.entity';
export declare class PostService {
    private readonly postRepo;
    private readonly userRepo;
    private readonly likeRepo;
    private readonly followRepo;
    constructor(postRepo: Repository<Post>, userRepo: Repository<User>, likeRepo: Repository<Like>, followRepo: Repository<Follow>);
    create(dto: any): Promise<Post>;
    findAll(currentUserId?: number): Promise<any[]>;
    findByUserId(userId: number): Promise<any[]>;
    findById(id: number): Promise<Post>;
    update(id: number, dto: UpdatePostDto): Promise<Post>;
    remove(id: number): Promise<void>;
}
