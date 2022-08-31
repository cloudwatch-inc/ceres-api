import { Migration } from '@mikro-orm/migrations';

export class Migration20220831153428 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "clients" alter column "middle_name" type varchar(40) using ("middle_name"::varchar(40));');
    this.addSql('alter table "clients" alter column "middle_name" drop not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "clients" alter column "middle_name" type varchar(40) using ("middle_name"::varchar(40));');
    this.addSql('alter table "clients" alter column "middle_name" set not null;');
  }

}
