import { Module, forwardRef } from '@nestjs/common';

import { MikroOrmFramework } from '@framework';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthModule } from '@module/auth';
import { UserClientModule } from '@module/user-client';

@Module({
  imports: [MikroOrmFramework, forwardRef(() => AuthModule), UserClientModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
