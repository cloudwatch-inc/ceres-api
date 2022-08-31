import { Migration } from '@mikro-orm/migrations';

export class Migration20220830133712 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "users" add column "is_profile_complete" boolean not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "users" drop column "is_profile_complete";');
  }

}
