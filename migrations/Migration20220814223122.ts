import { Migration } from '@mikro-orm/migrations';

export class Migration20220814223122 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "users" add constraint "users_email_unique" unique ("email");');
    this.addSql('alter table "users" add constraint "users_user_name_unique" unique ("user_name");');
  }

  async down(): Promise<void> {
    this.addSql('alter table "users" drop constraint "users_email_unique";');
    this.addSql('alter table "users" drop constraint "users_user_name_unique";');
  }

}
