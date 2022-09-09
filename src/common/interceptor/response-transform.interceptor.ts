import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  ServiceUnavailableException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { FastifyReply } from 'fastify';

export interface Response<T> {
  statusCode: number;
  message: string;
  data: T;
}

@Injectable()
export class ResponseTransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const res = context.switchToHttp().getResponse<FastifyReply>();

        res.send({
          statusCode: context.switchToHttp().getResponse().statusCode,
          message: data?.message || 'success',
          data: data,
        });
      }),
      // catchError(() => throwError(() => new ServiceUnavailableException())),
    );
  }
}
