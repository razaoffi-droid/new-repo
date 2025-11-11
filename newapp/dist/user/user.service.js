"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = __importStar(require("bcrypt"));
const user_entity_1 = require("./entities/user.entity");
let UserService = class UserService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async create(dto) {
        try {
            console.log('Creating user with email:', dto.email);
            const existing = await this.repo.findOne({ where: { email: dto.email } });
            if (existing) {
                console.warn('User already exists with email:', dto.email);
                throw new common_1.ConflictException('User with this email already exists');
            }
            const hashed = await bcrypt.hash(dto.password, 10);
            const user = this.repo.create({
                ...dto,
                password: hashed,
                phone: dto.phone ?? null,
                dob: dto.dob ?? null,
            });
            const saved = await this.repo.save(user);
            const { password, ...rest } = saved;
            console.log('User created successfully:', rest);
            return rest;
        }
        catch (error) {
            console.error('Error in create():', error);
            throw error;
        }
    }
    async findById(id) {
        try {
            console.log('Finding user by ID:', id);
            const user = await this.repo.findOne({
                where: { id },
                relations: ['followers', 'following', 'posts'],
            });
            if (!user) {
                console.warn('User not found with ID:', id);
                throw new common_1.NotFoundException('User not found');
            }
            const { password, ...rest } = user;
            console.log('User found:', rest);
            return rest;
        }
        catch (error) {
            console.error('Error in findById():', error);
            throw error;
        }
    }
    async findAll() {
        try {
            console.log('Fetching all users...');
            const users = await this.repo.find();
            console.log(`Found ${users.length} users`);
            return users.map(({ password, ...u }) => u);
        }
        catch (error) {
            console.error(' Error in findAll():', error);
            throw error;
        }
    }
    async findByEmail(email) {
        try {
            console.log('Searching user by email:', email);
            const user = await this.repo.findOne({ where: { email } });
            console.log('User found by email:', user);
            return user;
        }
        catch (error) {
            console.error('Error in findByEmail():', error);
            throw error;
        }
    }
    async update(id, dto) {
        try {
            console.log('Updating user with ID:', id);
            const user = await this.repo.findOne({ where: { id } });
            if (!user) {
                console.warn('User not found for update:', id);
                throw new common_1.NotFoundException('User not found');
            }
            if (dto.email && dto.email !== user.email) {
                const exists = await this.repo.findOne({ where: { email: dto.email } });
                if (exists) {
                    console.warn('Email already in use:', dto.email);
                    throw new common_1.ConflictException('Email already in use');
                }
            }
            if (dto.password) {
                dto.password = await bcrypt.hash(dto.password, 10);
            }
            Object.assign(user, {
                ...dto,
                phone: dto.phone ?? user.phone,
                dob: dto.dob ?? user.dob,
            });
            const saved = await this.repo.save(user);
            const { password, ...rest } = saved;
            console.log('User updated successfully:', rest);
            return rest;
        }
        catch (error) {
            console.error('Error in update():', error);
            throw error;
        }
    }
    async remove(id) {
        try {
            console.log('Removing user with ID:', id);
            const result = await this.repo.delete(id);
            console.log('User deleted successfully:', result);
        }
        catch (error) {
            console.error('Error in remove():', error);
            throw error;
        }
    }
    async getUserDashboard(userId) {
        try {
            console.log('📊 Building dashboard for userId:', userId);
            const user = await this.repo.findOne({
                where: { id: userId },
                relations: [
                    'posts',
                    'posts.comments',
                    'posts.comments.user',
                    'posts.likes',
                    'posts.likes.user',
                    'followers',
                    'followers.follower',
                    'following',
                    'following.following',
                ],
            });
            if (!user)
                throw new common_1.NotFoundException('User not found');
            const dashboardData = {
                id: user.id,
                email: user.email,
                phone: user.phone || '',
                dob: user.dob || '',
                followersCount: user.followers?.length || 0,
                followingCount: user.following?.length || 0,
                posts: user.posts.map((p) => ({
                    id: p.id,
                    title: p.title,
                    content: p.content,
                    likesCount: p.likes?.length || 0,
                    likedByUser: p.likes?.some((l) => l.user && l.user.id === user.id),
                    comments: p.comments.map((c) => ({
                        userEmail: c.user.email,
                        text: c.text,
                    })),
                })),
            };
            console.log('✅ Dashboard data prepared:', dashboardData);
            return dashboardData;
        }
        catch (error) {
            console.error('❌ Error in getUserDashboard():', error);
            throw error;
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
//# sourceMappingURL=user.service.js.map