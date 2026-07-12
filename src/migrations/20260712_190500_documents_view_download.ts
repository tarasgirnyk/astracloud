import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_documents" DROP COLUMN "viewer_file_url";
  ALTER TABLE "pages_blocks_documents" DROP COLUMN "viewer_label";
  ALTER TABLE "pages_blocks_documents" ADD COLUMN "download_link_label" varchar;`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_documents" ADD COLUMN "viewer_file_url" varchar NOT NULL DEFAULT '';
  ALTER TABLE "pages_blocks_documents" ADD COLUMN "viewer_label" varchar;
  ALTER TABLE "pages_blocks_documents" DROP COLUMN "download_link_label";`)
}
