import { Migration } from '@mikro-orm/migrations';

export class Migration20220905124010 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "masters" ("id" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "first_name" varchar(40) not null, "middle_name" varchar(40) null, "last_name" varchar(40) not null, "age" smallint not null, "bod" date not null, "photo" varchar(255) null, "cover_photo" varchar(255) null, "user_id" varchar(255) not null, constraint "masters_pkey" primary key ("id"));');
    this.addSql('create index "masters_id_index" on "masters" ("id");');
    this.addSql('alter table "masters" add constraint "masters_user_id_unique" unique ("user_id");');

    this.addSql('create table "address" ("id" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "address_unit" varchar(40) null, "address_street" varchar(60) null, "address1" varchar(60) not null, "address2" varchar(60) null, "suburb" varchar(40) null, "city" varchar(40) not null, "state" varchar(40) not null, "zip" varchar(40) not null, "country" varchar(40) not null, "user_id" varchar(255) not null, constraint "address_pkey" primary key ("id"));');
    this.addSql('create index "address_id_index" on "address" ("id");');
    this.addSql('alter table "address" add constraint "address_user_id_unique" unique ("user_id");');

    this.addSql('alter table "masters" add constraint "masters_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;');

    this.addSql('alter table "address" add constraint "address_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;');

    this.addSql('alter table "clients" drop column "address_unit";');
    this.addSql('alter table "clients" drop column "address_street";');
    this.addSql('alter table "clients" drop column "address1";');
    this.addSql('alter table "clients" drop column "address2";');
    this.addSql('alter table "clients" drop column "suburb";');
    this.addSql('alter table "clients" drop column "state";');
    this.addSql('alter table "clients" drop column "zip";');
    this.addSql('alter table "clients" drop column "country";');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "masters" cascade;');

    this.addSql('drop table if exists "address" cascade;');

    this.addSql('alter table "clients" add column "address_unit" varchar(40) null, add column "address_street" varchar(60) null, add column "address1" varchar(60) not null, add column "address2" varchar(60) null, add column "suburb" varchar(40) null, add column "state" varchar(40) not null, add column "zip" varchar(40) not null, add column "country" varchar(40) not null;');
  }

}
