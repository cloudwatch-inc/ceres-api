import { HttpException, HttpStatus } from '@nestjs/common';

export class DbException extends HttpException {
  constructor(code?: HttpStatus) {
    if (+code === HttpStatus.CONFLICT) {
      super(
        {
          status_code: HttpStatus.CONFLICT,
          error: 'Conflict',
          message: 'Username or Email already exists',
        },
        HttpStatus.CONFLICT,
      );
    } else {
      super('Unknown error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
