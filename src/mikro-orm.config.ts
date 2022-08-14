import { User } from '@core';
import { Options } from '@mikro-orm/core';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BaseEntity } from './core/BaseEntity';

const logger = new Logger('MikroORM');
const configService = new ConfigService();

const MikroOrmConfig: Options = {
  entities: [User, BaseEntity],
  type: 'postgresql',
  dbName: configService.get('POSTGRES_DB'),
  user: configService.get('POSTGRES_USER'),
  password: configService.get('POSTGRES_PASSWORD'),
  host: configService.get('POSTGRES_HOST'),
  port: configService.get('POSTGRES_PORT'),
  debug: true,
  logger: logger.log.bind(logger),
};

export default MikroOrmConfig;
