// import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import * as bcrypt from 'bcrypt';
// import { RegisterDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
// import { User } from './entities/user.entity';

// @Injectable()
// export class UserService {
//   constructor(@InjectRepository(User) private readonly repo: Repository<User>) {}

//   async create(dto: RegisterDto): Promise<Omit<User, 'password'>> {
//     try {
//       console.log('Creating user with email:', dto.email);
//       const existing = await this.repo.findOne({ where: { email: dto.email } });
//       if (existing) {
//         console.warn(' User already exists with email:', dto.email);
//         throw new ConflictException('User with this email already exists');
//       }

//       const hashed = await bcrypt.hash(dto.password, 10);
//       const user = this.repo.create({ ...dto, password: hashed });
//       const saved = await this.repo.save(user);
//       const { password, ...rest } = saved;
//       console.log('User created successfully:', rest);
//       return rest;
//     } catch (error) {
//       console.error('Error in create():', error);
//       throw error;
//     }
//   }

//   async findAll(): Promise<Omit<User, 'password'>[]> {
//     try {
//       console.log('Fetching all users...');
//       const users = await this.repo.find();
//       console.log(`Found ${users.length} users`);
//       return users.map(({ password, ...u }) => u);
//     } catch (error) {
//       console.error(' Error in findAll():', error);
//       throw error;
//     }
//   }

//   async findById(id: number): Promise<Omit<User, 'password'>> {
//     try {
//       console.log('Finding user by ID:', id);
//       const user = await this.repo.findOne({
//         where: { id },
//         relations: ['followers', 'following', 'posts'],
//       });

//       if (!user) {
//         console.warn('User not found with ID:', id);
//         throw new NotFoundException('User not found');
//       }

//       const { password, ...rest } = user;
//       console.log('User found:', rest);
//       return rest;
//     } catch (error) {
//       console.error('Error in findById():', error);
//       throw error;
//     }
//   }

//   async findByEmail(email: string): Promise<User | null> {
//     try {
//       console.log('Searching user by email:', email);
//       const user = await this.repo.findOne({ where: { email } });
//       console.log(' User found by email:', user);
//       return user;
//     } catch (error) {
//       console.error(' Error in findByEmail():', error);
//       throw error;
//     }
//   }

//   async update(id: number, dto: UpdateUserDto): Promise<Omit<User, 'password'>> {
//     try {
//       console.log('Updating user with ID:', id);
//       const user = await this.repo.findOne({ where: { id } });
//       if (!user) {
//         console.warn(' User not found for update:', id);
//         throw new NotFoundException('User not found');
//       }

//       if (dto.email && dto.email !== user.email) {
//         const exists = await this.repo.findOne({ where: { email: dto.email } });
//         if (exists) {
//           console.warn('Email already in use:', dto.email);
//           throw new ConflictException('Email already in use');
//         }
//       }

//       if (dto.password) {
//         dto.password = await bcrypt.hash(dto.password, 10);
//       }
//       Object.assign(user, dto);
//       const saved = await this.repo.save(user);
//       const { password, ...rest } = saved;
//       console.log('User updated successfully:', rest);
//       return rest;
//     } catch (error) {
//       console.error('Error in update():', error);
//       throw error;
//     }
//   }

//   async remove(id: number): Promise<void> {
//     try {
//       console.log('Removing user with ID:', id);
//       const result = await this.repo.delete(id);
//       console.log('User deleted successfully:', result);
//     } catch (error) {
//       console.error('Error in remove():', error);
//       throw error;
//     }
//   }

//   // ✅ NEW METHOD for Dashboard
//   async getUserDashboard(userId: number) {
//     try {
//       console.log('📊 Building dashboard for userId:', userId);
//       const user = await this.repo.findOne({
//         where: { id: userId },
//         relations: [
//           'posts',
//           'posts.comments',
//           'posts.comments.user',
//           'posts.likes',
//           'posts.likes.user',
//           'followers',
//           'followers.follower',
//           'following',
//           'following.following',
//         ],
//       });

//       if (!user) throw new NotFoundException('User not found');

//       const dashboardData = {
//         id: user.id,
//         email: user.email,
//         followersCount: user.followers?.length || 0,
//         followingCount: user.following?.length || 0,
//         posts: user.posts.map((p) => ({
//           id: p.id,
//           title: p.title,
//           content: p.content,
//           likesCount: p.likes?.length || 0,
//           likedByUser: p.likes?.some((l) => l.user && l.user.id === user.id),
//           comments: p.comments.map((c) => ({
//             userEmail: c.user.email,
//             text: c.text,
//           })),
//         })),
//       };

//       console.log('✅ Dashboard data prepared:', dashboardData);
//       return dashboardData;
//     } catch (error) {
//       console.error('❌ Error in getUserDashboard():', error);
//       throw error;
//     }
//   }
// }


import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly repo: Repository<User>) {}

 async create(dto: RegisterDto): Promise<Omit<User, 'password'>> {
  try {
    console.log('Creating user with email:', dto.email);
    const existing = await this.repo.findOne({ where: { email: dto.email } });
    if (existing) {
      console.warn('User already exists with email:', dto.email);
      throw new ConflictException('User with this email already exists');
    }

    const hashed = await bcrypt.hash(dto.password, 10);

    // ✅ Fix: Type-safe creation of user
    const user = this.repo.create({
      ...dto,
      password: hashed,
      phone: dto.phone ?? null,
      dob: dto.dob ?? null,
    } ); // <-- Important cast here

    const saved = await this.repo.save(user);
    const { password, ...rest } = saved;
    console.log('User created successfully:', rest);
    return rest;
  } catch (error) {
    console.error('Error in create():', error);
    throw error;
  }
}


  async findById(id: number): Promise<Omit<User, 'password'>> {
    try {
      console.log('Finding user by ID:', id);
      const user = await this.repo.findOne({
        where: { id },
        relations: ['followers', 'following', 'posts'],
      });

      if (!user) {
        console.warn('User not found with ID:', id);
        throw new NotFoundException('User not found');
      }

      const { password, ...rest } = user;
      console.log('User found:', rest);
      return rest;
    } catch (error) {
      console.error('Error in findById():', error);
      throw error;
    }
  }


    async findAll(): Promise<Omit<User, 'password'>[]> {
    try {
      console.log('Fetching all users...');
      const users = await this.repo.find();
      console.log(`Found ${users.length} users`);
      return users.map(({ password, ...u }) => u);
    } catch (error) {
      console.error(' Error in findAll():', error);
      throw error;
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      console.log('Searching user by email:', email);
      const user = await this.repo.findOne({ where: { email } });
      console.log('User found by email:', user);
      return user;
    } catch (error) {
      console.error('Error in findByEmail():', error);
      throw error;
    }
  }

  async update(id: number, dto: UpdateUserDto): Promise<Omit<User, 'password'>> {
    try {
      console.log('Updating user with ID:', id);
      const user = await this.repo.findOne({ where: { id } });
      if (!user) {
        console.warn('User not found for update:', id);
        throw new NotFoundException('User not found');
      }

      if (dto.email && dto.email !== user.email) {
        const exists = await this.repo.findOne({ where: { email: dto.email } });
        if (exists) {
          console.warn('Email already in use:', dto.email);
          throw new ConflictException('Email already in use');
        }
      }

      if (dto.password) {
        dto.password = await bcrypt.hash(dto.password, 10);
      }

      // ✅ Ensure phone and dob update too
      Object.assign(user, {
        ...dto,
        phone: dto.phone ?? user.phone,
        dob: dto.dob ?? user.dob,
      });

      const saved = await this.repo.save(user);
      const { password, ...rest } = saved;
      console.log('User updated successfully:', rest);
      return rest;
    } catch (error) {
      console.error('Error in update():', error);
      throw error;
    }
  }

  async remove(id: number): Promise<void> {
    try {
      console.log('Removing user with ID:', id);
      const result = await this.repo.delete(id);
      console.log('User deleted successfully:', result);
    } catch (error) {
      console.error('Error in remove():', error);
      throw error;
    }
  }

  // ✅ Enhanced Dashboard method (includes phone & dob)
  async getUserDashboard(userId: number) {
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

      if (!user) throw new NotFoundException('User not found');

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
    } catch (error) {
      console.error('❌ Error in getUserDashboard():', error);
      throw error;
    }
  }
}
