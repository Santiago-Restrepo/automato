import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { randomUUID } from 'crypto';

@Injectable()
export default class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('Request');

  constructor() {}

  intercept(ctx: ExecutionContext, next: CallHandler): Observable<any> {
    const request: Request = ctx.switchToHttp().getRequest();
    const defaultLog = this.initializeLog(request);

    request['requestId'] = defaultLog.requestId;
    this.logger.log(defaultLog);

    return next
      .handle()
      .pipe(
        tap(() => {
          const response: Response = ctx.switchToHttp().getResponse();
          const { statusCode } = response;
          const finishedAt = Date.now();

          const message = {
            ...defaultLog,
            kind: 'outcoming-response',
            status: statusCode,
            contentLength: response.get('content-length'),
            finishAt: finishedAt,
            duration: finishedAt - defaultLog.startedAt,
          };

          this.logger.log(message);
        }),
      )
      .pipe(catchError((error: Error) => this.onError(error, defaultLog)));
  }

  private initializeLog(request: Request) {
    const startedAt = Date.now();
    const userAgent = request.get('user-agent') ?? '';
    const { ip, method, originalUrl, body } = request;
    const requestId = randomUUID();
    return {
      kind: 'incoming-request',
      requestId,
      message: `${method} - ${originalUrl}`,
      method,
      url: originalUrl,
      ip,
      userAgent,
      startedAt,
      body,
    };
  }

  private onError(error: Error, defaultLog: any) {
    const finishedAt = Date.now();

    return throwError(() => {
      const statusCode =
        error instanceof HttpException ? error.getStatus() : 500;

      const message = {
        ...defaultLog,
        message: error.message,
        status: statusCode,
        finishedAt: finishedAt,
        duration: finishedAt - defaultLog.startAt,
      };

      this.logger.error(message, error.stack);

      return error;
    });
  }
}
