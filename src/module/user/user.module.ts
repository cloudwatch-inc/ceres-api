import { MikroOrmFramework } from '@framework';
import { Module } from '@nestjs/common';

@Module({
  imports: [MikroOrmFramework],
})
export class UserModule {}
