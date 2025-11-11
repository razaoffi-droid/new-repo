import { Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Entity('follow')
export class Follow {
  @PrimaryGeneratedColumn()
  id: number;

  // The user who follows someone
  @ManyToOne(() => User, (user) => user.following, { eager: false, onDelete: 'CASCADE' })
  follower: User;

  // The user who is being followed
  @ManyToOne(() => User, (user) => user.followers, { eager: false, onDelete: 'CASCADE' })
  following: User;

  @CreateDateColumn()
  createdAt: Date;
}
