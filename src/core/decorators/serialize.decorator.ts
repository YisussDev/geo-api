import { UseInterceptors, applyDecorators } from '@nestjs/common';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { map } from 'rxjs/operators';
import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';

export function Serialize(dto: ClassConstructor<any>) {
  return applyDecorators(
    UseInterceptors(new SerializeInterceptor(dto)),
  );
}

class SerializeInterceptor implements NestInterceptor {
  constructor(private readonly dto: ClassConstructor<any>) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(data => plainToInstance(this.dto, data, { excludeExtraneousValues: true })),
    );
  }
}