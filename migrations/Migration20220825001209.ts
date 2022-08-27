import { Migration } from '@mikro-orm/migrations';

export class Migration20220825001209 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "users" add column "hashed_refresh_token" varchar(255) null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "users" drop column "hashed_refresh_token";');
  }

}
