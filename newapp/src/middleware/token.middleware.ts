import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config(); // ✅ loads .env file

@Injectable()
export class LogTokenMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
      console.warn('⚠️ No JWT token found in Authorization header');
      return next();
    }

    const token = authHeader.split(' ')[1];
    console.log('🔑 JWT Token from request:', token);

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'mySuperSecretKey');
      console.log('✅ Token decoded successfully:', decoded);
      (req as any).user = decoded;
    } catch (err) {
      console.error('❌ Invalid token:', err.message);
    }

    next();
  }
}
