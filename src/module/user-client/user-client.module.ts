import { MikroOrmFramework } from '@framework';
import { Module } from '@nestjs/common';
import { UserClientService } from './';

@Module({
  imports: [MikroOrmFramework],
  providers: [UserClientService],
  exports: [UserClientService],
})
export class UserClientModule {}
