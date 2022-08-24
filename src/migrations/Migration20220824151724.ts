import { Migration } from '@mikro-orm/migrations';

export class Migration20220824151724 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "users" drop constraint if exists "users_role_check";');

    this.addSql('alter table "users" alter column "role" drop default;');
    this.addSql('alter table "users" alter column "role" type text using ("role"::text);');
    this.addSql('alter table "users" add constraint "users_role_check" check ("role" in (\'user\', \'admin\', \'professional\'));');
  }

  async down(): Promise<void> {
    this.addSql('alter table "users" drop constraint if exists "users_role_check";');

    this.addSql('alter table "users" alter column "role" type smallint using ("role"::smallint);');
    this.addSql('alter table "users" alter column "role" set default user;');
  }

}
