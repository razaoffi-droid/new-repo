// src/dto/create-user.dto.ts
import { IsEmail, IsNotEmpty, MinLength, IsDateString } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  @IsDateString()
  dob: string; // e.g. "1990-01-01"
}
