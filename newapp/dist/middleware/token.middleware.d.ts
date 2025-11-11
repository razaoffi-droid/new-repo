import { NestMiddleware } from '@nestjs/common';
export declare class LogTokenMiddleware implements NestMiddleware {
    use(req: any, res: any, next: () => void): void;
}
