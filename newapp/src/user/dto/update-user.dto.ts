import { PartialType } from '@nestjs/mapped-types';
import { RegisterDto } from './create-user.dto';
import { IsEmail, IsOptional, MinLength, IsDateString } from 'class-validator';
export class UpdateUserDto extends PartialType(RegisterDto) {
  
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @MinLength(6)
  password?: string;

  @IsOptional()
  phone?: string;

  @IsOptional()
  @IsDateString()
  dob?: string;
}
