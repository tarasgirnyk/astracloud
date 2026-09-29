import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "service_pages_blocks_colocation_calculator" ADD COLUMN "installation_price" numeric DEFAULT 1000 NOT NULL;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "service_pages_blocks_colocation_calculator" DROP COLUMN "installation_price";`)
}
