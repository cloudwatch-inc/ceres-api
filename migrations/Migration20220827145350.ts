import { Migration } from '@mikro-orm/migrations';

export class Migration20220827145350 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "users" ("id" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "email" varchar(255) not null, "user_name" varchar(255) not null, "is_active" boolean not null, "role" text check ("role" in (\'admin\', \'client\', \'professional\', \'company\', \'business\')) not null default \'client\', "password" varchar(255) not null, "hashed_refresh_token" varchar(255) null, constraint "users_pkey" primary key ("id"));');
    this.addSql('create index "users_id_index" on "users" ("id");');
    this.addSql('alter table "users" add constraint "users_email_unique" unique ("email");');
    this.addSql('alter table "users" add constraint "users_user_name_unique" unique ("user_name");');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "users" cascade;');
  }

}
