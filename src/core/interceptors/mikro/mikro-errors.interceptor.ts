import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException, HttpException, InternalServerErrorException
} from "@nestjs/common";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable()
export class MikroORMErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError(err => {

        // Aquí puedes manejar diferentes tipos de errores
        if (err instanceof BadRequestException) {
          // Manejar errores de tipo BadRequestException
          return throwError(() => new BadRequestException(err.message));
        } else if (err instanceof HttpException) {
          // Manejar otros errores HTTP
          return throwError(() => new HttpException(err.message, err.getStatus()));
        } else {
          // Manejar errores no controlados
          console.log(err.detail);
          return throwError(() => new InternalServerErrorException(`${err.detail}`));
        }
      })
    );
  }
}