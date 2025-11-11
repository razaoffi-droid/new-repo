// src/likes/entities/like.entity.ts
import { Post } from 'src/posts/entities/post.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
// import { Post } from '../../posts/entities/post.entity'; // 👈 correct import

@Entity()
export class Like {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userEmail: string;

  // ✅ Reference Post.likes (from Post entity)
 @ManyToOne(() => Post, (post) => post.likes, { onDelete: 'CASCADE' })
  post: Post;

  @ManyToOne(() => User, (user) => user.likes, { eager: true, onDelete: 'CASCADE' })
  user: User;

  @CreateDateColumn()
  createdAt: Date;
}



// import { Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
// import { User } from '../../user/entities/user.entity';
// import { Post } from '../../post/entities/post.entity';

// @Entity()
// export class Like {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @ManyToOne(() => User, (user) => user.likes, { eager: true, onDelete: 'CASCADE' })
//   user: User;

//   @ManyToOne(() => Post, (post) => post.likes, { onDelete: 'CASCADE' })
//   post: Post;

//   @CreateDateColumn()
//   createdAt: Date;
// }
