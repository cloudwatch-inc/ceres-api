import { Module, forwardRef } from '@nestjs/common';

import { MikroOrmFramework } from '@framework';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthModule } from '@module/auth';
import { ClientService } from './child/client';

@Module({
  imports: [MikroOrmFramework, forwardRef(() => AuthModule)],
  controllers: [UserController],
  providers: [UserService, ClientService],
  exports: [UserService, ClientService],
})
export class UserModule {}
