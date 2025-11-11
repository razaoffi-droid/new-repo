import {Body,Controller,Post,Get,Put,Delete,Param,UseGuards,ParseIntPipe,NotFoundException, Req} from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterDto } from './dto/create-user.dto';
import { JwtAuthGuard } from './auth/auth/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';


@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //  Register new user
  @Post('register')
  async create(@Body() dto: RegisterDto) {
  return this.userService.create(dto);
  }

    // @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(@Req() req) {
    const userId = req.user.id; // comes from JWT payload
    return this.userService.getUserDashboard(userId);
  }

  //  Find one user by EMAIL instead of ID
@Get('email/:email')
// @UseGuards(JwtAuthGuard)
async findByEmail(@Param('email') email: string) {
  const user = await this.userService.findByEmail(email);
  if (!user) {
  throw new NotFoundException('User not found');
  }

}
  //  Update user by ID
  @Put(':id')
  // @UseGuards(JwtAuthGuard)
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateUserDto) {
  return this.userService.update(id, dto);
  }

  //  Get all users
  @Get('all')
  // @UseGuards(JwtAuthGuard)
  async findAll() {
  return this.userService.findAll();
  }

  //  Delete user by ID (fixed @Param)
  @Delete(':id')
  // @UseGuards(JwtAuthGuard)
  async remove(@Param('id', ParseIntPipe) id: number) {
  await this.userService.remove(id);
  return { message: 'User deleted' };
  }
}
