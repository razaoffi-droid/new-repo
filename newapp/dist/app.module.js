"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const user_module_1 = require("./user/user.module");
const auth_module_1 = require("./user/auth/auth/auth.module");
const comments_module_1 = require("./comments/comments.module");
const token_middleware_1 = require("./middleware/token.middleware");
const Like_Module_1 = require("./likes/Like.Module");
const follows_module_1 = require("./follows/follows.module");
const posts_module_1 = require("./posts/posts.module");
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(token_middleware_1.LogTokenMiddleware).forRoutes('*');
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: process.env.POSTGRES_HOST || 'localhost',
                port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
                username: process.env.POSTGRES_USER || 'postgres',
                password: process.env.POSTGRES_PASSWORD || 'root',
                database: process.env.POSTGRES_DB || 'posts',
                entities: [__dirname + '/**/*.entity{.ts,.js}'],
                synchronize: true,
            }),
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            posts_module_1.PostModule,
            comments_module_1.CommentsModule,
            Like_Module_1.LikeModule,
            follows_module_1.FollowModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map