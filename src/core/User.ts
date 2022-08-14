import { UserRole } from '@common/enum';
import { Entity, Property, Enum } from '@mikro-orm/core';
import { BaseEntity } from './BaseEntity';

@Entity({ tableName: 'users' })
export class User extends BaseEntity {
  @Property()
  email!: string;

  @Property()
  user_name!: string;

  @Property()
  is_active = true;

  @Enum({ default: [UserRole.USER] })
  role: [UserRole.USER];

  @Property({ length: 8 })
  password!: string;
}
