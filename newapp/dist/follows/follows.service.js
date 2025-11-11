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
exports.FollowService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../user/entities/user.entity");
const follwos_entity_1 = require("./follwos.entity");
let FollowService = class FollowService {
    followRepo;
    userRepo;
    constructor(followRepo, userRepo) {
        this.followRepo = followRepo;
        this.userRepo = userRepo;
    }
    async followUser(followerId, followingId) {
        const follower = await this.userRepo.findOne({ where: { id: followerId } });
        const following = await this.userRepo.findOne({ where: { id: followingId } });
        if (!follower || !following)
            throw new common_1.NotFoundException('User not found');
        const existing = await this.followRepo.findOne({
            where: { follower: { id: followerId }, following: { id: followingId } },
        });
        if (existing)
            return { message: 'Already following' };
        const follow = this.followRepo.create({ follower, following });
        await this.followRepo.save(follow);
        return { message: `User ${follower.email} now follows ${following.email}` };
    }
    async getFollowers(userId) {
        console.log('Fetching followers for user ID:', userId);
        const follows = await this.followRepo.find({
            where: { following: { id: userId } },
            relations: ['follower', 'following'],
        });
        console.log('Followers found:', follows.map(f => f.follower));
        return follows.map(f => f.follower);
    }
    async getFollowing(userId) {
        const follows = await this.followRepo.find({
            where: { follower: { id: userId } },
            relations: ['following'],
        });
        console.log('Following found:', follows);
        return follows.map(f => f.following);
    }
    async unfollowUser(followerId, followingId) {
        const follow = await this.followRepo.findOne({
            where: {
                follower: { id: followerId },
                following: { id: followingId },
            },
        });
        if (!follow)
            throw new common_1.NotFoundException('Not following this user');
        await this.followRepo.remove(follow);
        return { message: 'Unfollowed successfully' };
    }
};
exports.FollowService = FollowService;
exports.FollowService = FollowService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(follwos_entity_1.Follow)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], FollowService);
//# sourceMappingURL=follows.service.js.map