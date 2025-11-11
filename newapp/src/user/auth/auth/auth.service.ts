import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../user.service';
import { RegisterDto } from '../../dto/create-user.dto';
import { LoginDto } from '../../dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  // ✅ LOGIN
  async login(dto: LoginDto) {
    console.log('🔍 Trying to log in:', dto.email);

    const user = await this.userService.findByEmail(dto.email);
    if (!user) throw new UnauthorizedException('Invalid email');

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) throw new UnauthorizedException('Invalid password');

    const payload = { id: user.id, email: user.email };
    const token = this.jwtService.sign(payload);

    console.log('✅ Login successful for:', user.email);
    return { access_token: token, user };
  }

  // ✅ REGISTER
  async register(dto: RegisterDto) {
    // Don't hash here — the UserService already does it
    const existing = await this.userService.findByEmail(dto.email);
    if (existing) throw new BadRequestException('User already exists');

    const user = await this.userService.create(dto);

    return {
      message: 'User registered successfully',
      user: {
        id: user.id,
        email: user.email,
        phone: user.phone,
        dob: user.dob,
      },
    };
  }
}
