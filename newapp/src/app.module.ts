import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './user/auth/auth/auth.module';
import { CommentsModule } from './comments/comments.module'; // ✅ comments module
import { LogTokenMiddleware } from './middleware/token.middleware';
import { LikeModule } from './likes/Like.Module';
import { FollowModule } from './follows/follows.module';
import { PostModule } from './posts/posts.module';


@Module({
  imports: [
    // ✅ Load .env globally
    ConfigModule.forRoot({ isGlobal: true }),

    // ✅ Database connection
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST || 'localhost',
      port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
      username: process.env.POSTGRES_USER || 'postgres',
      password: process.env.POSTGRES_PASSWORD || 'root',
      database: process.env.POSTGRES_DB || 'posts',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // ❗set to false in production
    }),

    // ✅ App modules
    AuthModule,
    UserModule,
    PostModule,
    CommentsModule, // ✅ make sure CommentsModule is imported AFTER PostsModule
    LikeModule,
    FollowModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogTokenMiddleware).forRoutes('*'); // ✅ applies to all routes
  }
}
