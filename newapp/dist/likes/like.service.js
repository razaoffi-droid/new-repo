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
exports.LikeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const like_entity_1 = require("./like.entity");
const post_entity_1 = require("../posts/entities/post.entity");
let LikeService = class LikeService {
    likeRepo;
    postRepo;
    constructor(likeRepo, postRepo) {
        this.likeRepo = likeRepo;
        this.postRepo = postRepo;
    }
    async likePost(postId, userEmail) {
        console.log('✅ Like request for postId:', postId, 'by user:', userEmail);
        const post = await this.postRepo.findOne({ where: { id: postId } });
        if (!post)
            throw new common_1.NotFoundException('Post not found');
        const existing = await this.likeRepo.findOne({
            where: { post: { id: postId }, userEmail },
        });
        if (existing) {
            console.log('⚠️ Already liked');
            return { message: 'Already liked' };
        }
        const like = this.likeRepo.create({
            userEmail,
            post,
        });
        const saved = await this.likeRepo.save(like);
        console.log('❤️ Like saved successfully:', saved);
        return saved;
    }
    async unlikePost(postId, userEmail) {
        console.log('💔 Unlike request for postId:', postId, 'by user:', userEmail);
        const existing = await this.likeRepo.findOne({
            where: { post: { id: postId }, userEmail },
        });
        if (!existing) {
            throw new common_1.NotFoundException('Like not found for this user/post');
        }
        await this.likeRepo.remove(existing);
        console.log('🗑️ Like removed successfully');
        return { message: 'Unliked successfully' };
    }
    async getLikes(postId) {
        const likes = await this.likeRepo.find({
            where: { post: { id: postId } },
        });
        return likes;
    }
};
exports.LikeService = LikeService;
exports.LikeService = LikeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(like_entity_1.Like)),
    __param(1, (0, typeorm_1.InjectRepository)(post_entity_1.Post)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], LikeService);
//# sourceMappingURL=like.service.js.map