import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_advantages" ADD COLUMN "split_layout" boolean DEFAULT false;
  ALTER TABLE "service_pages_blocks_advantages" ADD COLUMN "split_layout" boolean DEFAULT false;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_advantages" DROP COLUMN "split_layout";
  ALTER TABLE "service_pages_blocks_advantages" DROP COLUMN "split_layout";`)
}
