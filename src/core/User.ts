import { UserRole } from '@common/enum';
import { Entity, Property, Enum } from '@mikro-orm/core';

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
  role = UserRole.USER;

  @Property({ hidden: true })
  password!: string;

  constructor(email: string, user_name: string, password: string) {
    super();
    this.email = email;
    this.user_name = user_name;
    this.password = password;
  }
}
