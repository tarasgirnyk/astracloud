import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_services_services_locales" ADD COLUMN "cta_href" varchar;
  ALTER TABLE "pages_blocks_services_services" DROP COLUMN "cta_href";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_services_services" ADD COLUMN "cta_href" varchar;
  ALTER TABLE "pages_blocks_services_services_locales" DROP COLUMN "cta_href";`)
}
