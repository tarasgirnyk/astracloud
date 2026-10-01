import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "service_pages_blocks_colocation_calculator" ADD COLUMN "electricity_settings_price_per_kwh" numeric DEFAULT 18.7 NOT NULL;
  ALTER TABLE "service_pages_blocks_colocation_calculator" ADD COLUMN "electricity_settings_hours_per_day" numeric DEFAULT 24 NOT NULL;
  ALTER TABLE "service_pages_blocks_colocation_calculator" ADD COLUMN "electricity_settings_days_per_month" numeric DEFAULT 30 NOT NULL;
  ALTER TABLE "service_pages_blocks_colocation_calculator_locales" ADD COLUMN "labels_calculation_details" varchar DEFAULT 'Деталі розрахунку' NOT NULL;
  ALTER TABLE "service_pages_blocks_colocation_calculator_power_options" DROP COLUMN "monthly_price";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "service_pages_blocks_colocation_calculator_power_options" ADD COLUMN "monthly_price" numeric DEFAULT 0 NOT NULL;
  ALTER TABLE "service_pages_blocks_colocation_calculator" DROP COLUMN "electricity_settings_price_per_kwh";
  ALTER TABLE "service_pages_blocks_colocation_calculator" DROP COLUMN "electricity_settings_hours_per_day";
  ALTER TABLE "service_pages_blocks_colocation_calculator" DROP COLUMN "electricity_settings_days_per_month";
  ALTER TABLE "service_pages_blocks_colocation_calculator_locales" DROP COLUMN "labels_calculation_details";`)
}
