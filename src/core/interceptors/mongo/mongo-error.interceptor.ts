import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
  InternalServerErrorException,
  HttpException
} from "@nestjs/common";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { ExtractErrorsMongo } from "../../helpers/errors/mongo/error.helper";

@Injectable()
export class MongoErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError(err => {
        const errorsFound = ExtractErrorsMongo(err) || [];
        // Aquí puedes manejar diferentes tipos de errores
        if (err instanceof BadRequestException) {
          // Manejar errores de tipo BadRequestException
          return throwError(() => new BadRequestException(err.message));
        } else if (err instanceof HttpException) {
          // Manejar otros errores HTTP
          return throwError(() => new HttpException(err.message, err.getStatus()));
        } else {
          // Manejar errores no controlados
          return throwError(() => new InternalServerErrorException({ errorsMongo: errorsFound }));
        }
      })
    );
  }
}
