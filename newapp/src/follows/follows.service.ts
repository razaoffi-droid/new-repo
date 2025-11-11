// follow.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Follow } from './follwos.entity';

@Injectable()
export class FollowService {
  constructor(
    @InjectRepository(Follow)
    private readonly followRepo: Repository<Follow>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async followUser(followerId: number, followingId: number) {
    const follower = await this.userRepo.findOne({ where: { id: followerId } });
    const following = await this.userRepo.findOne({ where: { id: followingId } });

    if (!follower || !following) throw new NotFoundException('User not found');

    const existing = await this.followRepo.findOne({
      where: { follower: { id: followerId }, following: { id: followingId } },
    });

    if (existing) return { message: 'Already following' };

    const follow = this.followRepo.create({ follower, following });
    await this.followRepo.save(follow);
    return { message: `User ${follower.email} now follows ${following.email}` };
  }

async getFollowers(userId: number) {
  console.log('Fetching followers for user ID:', userId);
  const follows = await this.followRepo.find({
    where: { following: { id: userId } },
    relations: ['follower', 'following'],
  });

  console.log('Followers found:', follows.map(f => f.follower));
  return follows.map(f => f.follower);
}

async getFollowing(userId: number) {
  const follows = await this.followRepo.find({
    where: { follower: { id: userId } },
    relations: ['following'],
  });
  console.log('Following found:', follows);
  return follows.map(f => f.following);
}


   async unfollowUser(followerId: number, followingId: number) {
    const follow = await this.followRepo.findOne({
      where: {
        follower: { id: followerId },
        following: { id: followingId },
      },
    });
    if (!follow) throw new NotFoundException('Not following this user');

    await this.followRepo.remove(follow);
    return { message: 'Unfollowed successfully' };
  }
}
