import { Migration } from '@mikro-orm/migrations';

export class Migration20220824144222 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "users" drop constraint if exists "users_role_check";');

    this.addSql('alter table "users" alter column "id" type varchar(255) using ("id"::varchar(255));');
    this.addSql('alter table "users" alter column "is_active" type boolean using ("is_active"::boolean);');
    this.addSql('alter table "users" alter column "role" type smallint using ("role"::smallint);');
    this.addSql('alter table "users" alter column "role" set default user;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "users" drop constraint if exists "users_role_check";');

    this.addSql('alter table "users" alter column "id" type jsonb using ("id"::jsonb);');
    this.addSql('alter table "users" alter column "is_active" type jsonb using ("is_active"::jsonb);');
    this.addSql('alter table "users" alter column "role" type text[] using ("role"::text[]);');
    this.addSql('alter table "users" alter column "role" set default \'{user}\';');
  }

}
