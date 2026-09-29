import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "service_pages_blocks_colocation_calculator_power_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" numeric NOT NULL,
  	"monthly_price" numeric DEFAULT 0 NOT NULL,
  	"setup_price" numeric DEFAULT 0 NOT NULL
  );
  
  CREATE TABLE "service_pages_blocks_colocation_calculator_power_options_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "service_pages_blocks_colocation_calculator_ip_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" numeric NOT NULL,
  	"monthly_price" numeric DEFAULT 0 NOT NULL,
  	"setup_price" numeric DEFAULT 0 NOT NULL
  );
  
  CREATE TABLE "service_pages_blocks_colocation_calculator_ip_options_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "service_pages_blocks_colocation_calculator_speed_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" numeric NOT NULL,
  	"monthly_price" numeric DEFAULT 0 NOT NULL,
  	"setup_price" numeric DEFAULT 0 NOT NULL
  );
  
  CREATE TABLE "service_pages_blocks_colocation_calculator_speed_options_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "service_pages_blocks_colocation_calculator" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"unit_settings_minimum" numeric DEFAULT 1 NOT NULL,
  	"unit_settings_maximum" numeric DEFAULT 42 NOT NULL,
  	"unit_settings_default_value" numeric DEFAULT 1 NOT NULL,
  	"unit_settings_monthly_price_per_unit" numeric DEFAULT 500 NOT NULL,
  	"unit_settings_setup_price_per_unit" numeric DEFAULT 1000 NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "service_pages_blocks_colocation_calculator_locales" (
  	"heading" varchar NOT NULL,
  	"subheading" varchar,
  	"unit_settings_label" varchar NOT NULL,
  	"labels_power" varchar NOT NULL,
  	"labels_ip" varchar NOT NULL,
  	"labels_speed" varchar NOT NULL,
  	"labels_monthly_total" varchar NOT NULL,
  	"labels_setup_total" varchar NOT NULL,
  	"labels_currency" varchar DEFAULT 'грн' NOT NULL,
  	"labels_monthly_suffix" varchar DEFAULT '/ місяць' NOT NULL,
  	"labels_vat_note" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  ALTER TABLE "service_pages_blocks_colocation_calculator_power_options" ADD CONSTRAINT "service_pages_blocks_colocation_calculator_power_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."service_pages_blocks_colocation_calculator"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "service_pages_blocks_colocation_calculator_power_options_locales" ADD CONSTRAINT "service_pages_blocks_colocation_calculator_power_options__fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."service_pages_blocks_colocation_calculator_power_options"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "service_pages_blocks_colocation_calculator_ip_options" ADD CONSTRAINT "service_pages_blocks_colocation_calculator_ip_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."service_pages_blocks_colocation_calculator"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "service_pages_blocks_colocation_calculator_ip_options_locales" ADD CONSTRAINT "service_pages_blocks_colocation_calculator_ip_options_loc_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."service_pages_blocks_colocation_calculator_ip_options"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "service_pages_blocks_colocation_calculator_speed_options" ADD CONSTRAINT "service_pages_blocks_colocation_calculator_speed_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."service_pages_blocks_colocation_calculator"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "service_pages_blocks_colocation_calculator_speed_options_locales" ADD CONSTRAINT "service_pages_blocks_colocation_calculator_speed_options__fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."service_pages_blocks_colocation_calculator_speed_options"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "service_pages_blocks_colocation_calculator" ADD CONSTRAINT "service_pages_blocks_colocation_calculator_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."service_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "service_pages_blocks_colocation_calculator_locales" ADD CONSTRAINT "service_pages_blocks_colocation_calculator_locales_parent_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."service_pages_blocks_colocation_calculator"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "service_pages_blocks_colocation_calculator_power_options_order_idx" ON "service_pages_blocks_colocation_calculator_power_options" USING btree ("_order");
  CREATE INDEX "service_pages_blocks_colocation_calculator_power_options_parent_id_idx" ON "service_pages_blocks_colocation_calculator_power_options" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "service_pages_blocks_colocation_calculator_power_options_loc" ON "service_pages_blocks_colocation_calculator_power_options_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "service_pages_blocks_colocation_calculator_ip_options_order_idx" ON "service_pages_blocks_colocation_calculator_ip_options" USING btree ("_order");
  CREATE INDEX "service_pages_blocks_colocation_calculator_ip_options_parent_id_idx" ON "service_pages_blocks_colocation_calculator_ip_options" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "service_pages_blocks_colocation_calculator_ip_options_locale" ON "service_pages_blocks_colocation_calculator_ip_options_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "service_pages_blocks_colocation_calculator_speed_options_order_idx" ON "service_pages_blocks_colocation_calculator_speed_options" USING btree ("_order");
  CREATE INDEX "service_pages_blocks_colocation_calculator_speed_options_parent_id_idx" ON "service_pages_blocks_colocation_calculator_speed_options" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "service_pages_blocks_colocation_calculator_speed_options_loc" ON "service_pages_blocks_colocation_calculator_speed_options_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "service_pages_blocks_colocation_calculator_order_idx" ON "service_pages_blocks_colocation_calculator" USING btree ("_order");
  CREATE INDEX "service_pages_blocks_colocation_calculator_parent_id_idx" ON "service_pages_blocks_colocation_calculator" USING btree ("_parent_id");
  CREATE INDEX "service_pages_blocks_colocation_calculator_path_idx" ON "service_pages_blocks_colocation_calculator" USING btree ("_path");
  CREATE UNIQUE INDEX "service_pages_blocks_colocation_calculator_locales_locale_pa" ON "service_pages_blocks_colocation_calculator_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "service_pages_blocks_colocation_calculator_power_options" CASCADE;
  DROP TABLE "service_pages_blocks_colocation_calculator_power_options_locales" CASCADE;
  DROP TABLE "service_pages_blocks_colocation_calculator_ip_options" CASCADE;
  DROP TABLE "service_pages_blocks_colocation_calculator_ip_options_locales" CASCADE;
  DROP TABLE "service_pages_blocks_colocation_calculator_speed_options" CASCADE;
  DROP TABLE "service_pages_blocks_colocation_calculator_speed_options_locales" CASCADE;
  DROP TABLE "service_pages_blocks_colocation_calculator" CASCADE;
  DROP TABLE "service_pages_blocks_colocation_calculator_locales" CASCADE;`)
}
