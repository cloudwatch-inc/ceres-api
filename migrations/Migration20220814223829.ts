import { Migration } from '@mikro-orm/migrations';

export class Migration20220814223829 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "users" alter column "password" type varchar(255) using ("password"::varchar(255));');
  }

  async down(): Promise<void> {
    this.addSql('alter table "users" alter column "password" type varchar(8) using ("password"::varchar(8));');
  }

}
