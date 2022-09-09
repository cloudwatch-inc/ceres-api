import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Address, Client, Master, MasterExpertise, User } from '@core';

@Module({
  imports: [
    MikroOrmModule.forRoot(),
    MikroOrmModule.forFeature({
      entities: [User, Client, Master, Address, MasterExpertise],
    }),
  ],
  exports: [MikroOrmModule],
})
export class MikroOrmFramework {}
