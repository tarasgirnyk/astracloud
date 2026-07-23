import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_consultation" ADD COLUMN "split_card" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_consultation" ADD COLUMN "illustration_src" varchar;
  ALTER TABLE "pages_blocks_consultation_locales" ADD COLUMN "badge_label" varchar;
  ALTER TABLE "pages_blocks_consultation_locales" ADD COLUMN "microcopy" varchar;
  ALTER TABLE "pages_blocks_consultation_locales" ADD COLUMN "illustration_placeholder" varchar;
  ALTER TABLE "service_pages_blocks_consultation" ADD COLUMN "split_card" boolean DEFAULT false;
  ALTER TABLE "service_pages_blocks_consultation" ADD COLUMN "illustration_src" varchar;
  ALTER TABLE "service_pages_blocks_consultation_locales" ADD COLUMN "badge_label" varchar;
  ALTER TABLE "service_pages_blocks_consultation_locales" ADD COLUMN "microcopy" varchar;
  ALTER TABLE "service_pages_blocks_consultation_locales" ADD COLUMN "illustration_placeholder" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_consultation" DROP COLUMN "split_card";
  ALTER TABLE "pages_blocks_consultation" DROP COLUMN "illustration_src";
  ALTER TABLE "pages_blocks_consultation_locales" DROP COLUMN "badge_label";
  ALTER TABLE "pages_blocks_consultation_locales" DROP COLUMN "microcopy";
  ALTER TABLE "pages_blocks_consultation_locales" DROP COLUMN "illustration_placeholder";
  ALTER TABLE "service_pages_blocks_consultation" DROP COLUMN "split_card";
  ALTER TABLE "service_pages_blocks_consultation" DROP COLUMN "illustration_src";
  ALTER TABLE "service_pages_blocks_consultation_locales" DROP COLUMN "badge_label";
  ALTER TABLE "service_pages_blocks_consultation_locales" DROP COLUMN "microcopy";
  ALTER TABLE "service_pages_blocks_consultation_locales" DROP COLUMN "illustration_placeholder";`)
}
