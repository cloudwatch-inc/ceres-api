import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { Master } from './Master';
import { BaseEntity } from './_BaseEntity';

@Entity({ tableName: 'master_expertises' })
export class MasterExpertise extends BaseEntity {
  constructor(payload: Partial<MasterExpertise>) {
    super();
    Object.assign(this, payload);
  }

  @Property({ length: 40 })
  name!: string;

  @Property({ length: 100 })
  description!: string;

  @Property({ columnType: 'smallint' })
  experience?: number;

  @Property({ length: 40 })
  companyName?: string;

  @Property({ length: 40 })
  companyAddress?: string;

  @Property({ columnType: 'date' })
  startedAt?: Date;

  @Property({ columnType: 'date' })
  endedAt?: Date;

  @ManyToOne(() => Master)
  master!: Master;
}
