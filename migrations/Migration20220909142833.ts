import { Migration } from '@mikro-orm/migrations';

export class Migration20220909142833 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "master_expertises" ("id" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(40) not null, "description" varchar(100) not null, "experience" smallint null, "company_name" varchar(40) null, "company_address" varchar(40) null, "started_at" date null, "ended_at" date null, "master_id" varchar(255) not null, constraint "master_expertises_pkey" primary key ("id"));');
    this.addSql('create index "master_expertises_id_index" on "master_expertises" ("id");');

    this.addSql('alter table "master_expertises" add constraint "master_expertises_master_id_foreign" foreign key ("master_id") references "masters" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "master_expertises" cascade;');
  }

}
