import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Client, User } from '@core';

@Module({
  imports: [
    MikroOrmModule.forRoot(),
    MikroOrmModule.forFeature({ entities: [User, Client] }),
  ],
  exports: [MikroOrmModule],
})
export class MikroOrmFramework {}
