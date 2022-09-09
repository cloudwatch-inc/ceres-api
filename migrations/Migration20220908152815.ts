import { Migration } from '@mikro-orm/migrations';

export class Migration20220908152815 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "users" ("id" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "email" varchar(255) not null, "user_name" varchar(255) not null, "is_active" boolean not null, "is_profile_complete" boolean not null, "role" text check ("role" in (\'admin\', \'client\', \'worker\', \'company\', \'agency\')) not null default \'client\', "phone" varchar(255) not null, "phone_region_code" varchar(255) null, "password" varchar(255) not null, "hashed_refresh_token" varchar(255) null, constraint "users_pkey" primary key ("id"));');
    this.addSql('create index "users_id_index" on "users" ("id");');
    this.addSql('alter table "users" add constraint "users_email_unique" unique ("email");');
    this.addSql('alter table "users" add constraint "users_user_name_unique" unique ("user_name");');

    this.addSql('create table "masters" ("id" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "first_name" varchar(40) not null, "middle_name" varchar(40) null, "last_name" varchar(40) not null, "age" smallint not null, "bod" date not null, "photo" varchar(255) null, "cover_photo" varchar(255) null, "user_id" varchar(255) not null, constraint "masters_pkey" primary key ("id"));');
    this.addSql('create index "masters_id_index" on "masters" ("id");');
    this.addSql('alter table "masters" add constraint "masters_user_id_unique" unique ("user_id");');

    this.addSql('create table "clients" ("id" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "first_name" varchar(40) not null, "middle_name" varchar(40) null, "last_name" varchar(40) not null, "age" smallint not null, "bod" date not null, "photo" varchar(255) null, "cover_photo" varchar(255) null, "user_id" varchar(255) not null, constraint "clients_pkey" primary key ("id"));');
    this.addSql('create index "clients_id_index" on "clients" ("id");');
    this.addSql('alter table "clients" add constraint "clients_user_id_unique" unique ("user_id");');

    this.addSql('create table "address" ("id" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "address_unit" varchar(40) null, "address_street" varchar(60) null, "address1" varchar(60) not null, "address2" varchar(60) null, "suburb" varchar(40) null, "city" varchar(40) not null, "state" varchar(40) not null, "zip" varchar(40) not null, "country" varchar(40) not null, "user_id" varchar(255) not null, constraint "address_pkey" primary key ("id"));');
    this.addSql('create index "address_id_index" on "address" ("id");');
    this.addSql('alter table "address" add constraint "address_user_id_unique" unique ("user_id");');

    this.addSql('alter table "masters" add constraint "masters_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;');

    this.addSql('alter table "clients" add constraint "clients_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;');

    this.addSql('alter table "address" add constraint "address_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "masters" drop constraint "masters_user_id_foreign";');

    this.addSql('alter table "clients" drop constraint "clients_user_id_foreign";');

    this.addSql('alter table "address" drop constraint "address_user_id_foreign";');

    this.addSql('drop table if exists "users" cascade;');

    this.addSql('drop table if exists "masters" cascade;');

    this.addSql('drop table if exists "clients" cascade;');

    this.addSql('drop table if exists "address" cascade;');
  }

}
