import { Injectable, NestMiddleware, Type } from "@nestjs/common";
import { Request, Response, NextFunction } from 'express';

export function createAddNameMiddleware(name: string): Type<NestMiddleware> {
  @Injectable()
  class AddNameMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
      req["nameModule"] = name;
      next();
    }
  }
  return AddNameMiddleware;
}