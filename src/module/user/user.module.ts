import { MikroOrmFramework } from '@framework';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';

@Module({
  imports: [MikroOrmFramework],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
