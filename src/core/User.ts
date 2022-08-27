import { UserRole } from '@common/enum';
import { Entity, Property, Enum } from '@mikro-orm/core';
import { ApiHideProperty } from '@nestjs/swagger';

import { BaseEntity } from './BaseEntity';

@Entity({ tableName: 'users' })
export class User extends BaseEntity {
  @Property({ unique: true })
  email!: string;

  @Property({ unique: true })
  user_name!: string;

  @Property()
  is_active = true;

  @Enum(() => UserRole)
  role = UserRole.CLIENT;

  @Property({ hidden: true })
  password!: string;

  @Property({ hidden: true })
  @ApiHideProperty()
  hashed_refresh_token?: string;

  constructor(payload: Partial<User>) {
    super();
    Object.assign(this, payload);
  }
}
