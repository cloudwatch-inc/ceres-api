import { Migration } from '@mikro-orm/migrations';

export class Migration20220814222510 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "users" ("id" jsonb not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "email" varchar(255) not null, "user_name" varchar(255) not null, "is_active" jsonb not null, "role" text[] not null default \'{user}\', "password" varchar(8) not null, constraint "users_pkey" primary key ("id"));');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "users" cascade;');
  }

}
