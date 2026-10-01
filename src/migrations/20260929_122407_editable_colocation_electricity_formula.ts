import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "service_pages_blocks_colocation_calculator" ADD COLUMN "electricity_settings_formula" varchar DEFAULT 'powerW / 1000 * hoursPerDay * daysPerMonth * pricePerKwh' NOT NULL;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "service_pages_blocks_colocation_calculator" DROP COLUMN "electricity_settings_formula";`)
}
