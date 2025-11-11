"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const post_entity_1 = require("./entities/post.entity");
const user_entity_1 = require("../user/entities/user.entity");
const like_entity_1 = require("../likes/like.entity");
const follwos_entity_1 = require("../follows/follwos.entity");
let PostService = class PostService {
    postRepo;
    userRepo;
    likeRepo;
    followRepo;
    constructor(postRepo, userRepo, likeRepo, followRepo) {
        this.postRepo = postRepo;
        this.userRepo = userRepo;
        this.likeRepo = likeRepo;
        this.followRepo = followRepo;
    }
    async create(dto) {
        const user = await this.userRepo.findOne({ where: { id: dto.userId } });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        const post = this.postRepo.create({
            title: dto.title,
            content: dto.content,
            user,
        });
        return this.postRepo.save(post);
    }
    async findAll(currentUserId) {
        const posts = await this.postRepo.find({
            relations: ['user', 'comments', 'comments.user', 'likes'],
            order: { createdAt: 'DESC' },
        });
        const result = await Promise.all(posts.map(async (post) => {
            const likesCount = post.likes.length;
            const isLikedByUser = post.likes?.some((like) => like.user && like.user.id === currentUserId) || false;
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
        }));
        return result;
    }
    async findByUserId(userId) {
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
    async findById(id) {
        const post = await this.postRepo.findOne({
            where: { id },
            relations: ['user', 'comments', 'comments.user', 'likes'],
        });
        if (!post)
            throw new common_1.NotFoundException('Post not found');
        return post;
    }
    async update(id, dto) {
        console.log('✏️ Updating post:', id);
        const post = await this.postRepo.findOne({ where: { id } });
        if (!post)
            throw new common_1.NotFoundException('Post not found');
        Object.assign(post, dto);
        const updated = await this.postRepo.save(post);
        console.log('✅ Post updated:', updated);
        return updated;
    }
    async remove(id) {
        console.log('🗑️ Deleting post:', id);
        const result = await this.postRepo.delete(id);
        if (result.affected === 0)
            throw new common_1.NotFoundException('Post not found');
        console.log('✅ Post deleted successfully');
    }
};
exports.PostService = PostService;
exports.PostService = PostService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(post_entity_1.Post)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(like_entity_1.Like)),
    __param(3, (0, typeorm_1.InjectRepository)(follwos_entity_1.Follow)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], PostService);
//# sourceMappingURL=posts.service.js.map