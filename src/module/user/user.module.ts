import { Module } from '@nestjs/common';

import { MikroOrmFramework } from '@framework';
import { UserService } from './user.service';

@Module({
  imports: [MikroOrmFramework],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
