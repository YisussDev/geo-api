// validation-exception.interceptor.ts
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  BadRequestException, NotFoundException
} from "@nestjs/common";
import { catchError } from "rxjs/operators";
import { Observable, throwError } from "rxjs";

@Injectable()
export class DtoErrorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) => {
        if (err instanceof BadRequestException) {
          const response = err.getResponse();
          if (typeof response === "object" && response.hasOwnProperty("message")) {
            // Si el error es una instancia de BadRequestException y tiene un mensaje, lo lanzamos como un BadRequestException
            return throwError(() => new BadRequestException({
              statusCode: 400,
              message: response["message"] || "Verifique los campos.",
              errors: response["message"].error
            }));
          }
        }
        return throwError(() => err);
      })
    );
  }
}
