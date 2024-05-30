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

@Injectable()
export class HttpErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError(err => {
        console.log(err);

        if (err["name"] && (err["name"] == "ValidationError")) {
          return throwError(() => new BadRequestException({
            statusCode: 400,
            detail: "Error de validación.",
            message: err["name"] || "Validation failed",
            errors: err["name"]
          }));
        }

        if (err["name"] && (err["name"] == "UniqueConstraintViolationException") && err["code"]) {
          return throwError(() => new BadRequestException({
            statusCode: 400,
            detail: "Error en la base de datos.",
            message: err["detail"] || "Ocurrió un error con la base de datos.",
            errors: err["code"]
          }));
        }

        if(err['name'] && (err['name'] == "JsonWebTokenError")){
          return throwError(() => new BadRequestException({
            statusCode: 400,
            detail: "Error en la autenticación.",
            message: err["message"] || "Ocurrió un error con la autenticación.",
            errors: err["message"]
          }));
        }

        return throwError(() => err);
      })
    );
  }
}
