import { Migration } from '@mikro-orm/migrations';

export class Migration20220909134728 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "masters" add column "is_available" boolean not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "masters" drop column "is_available";');
  }

}
