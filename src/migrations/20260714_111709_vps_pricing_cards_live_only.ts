import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "service_pages_blocks_vps_pricing_cards_plans_spec_bullets" CASCADE;
  DROP TABLE "service_pages_blocks_vps_pricing_cards_plans_spec_bullets_locales" CASCADE;
  DROP TABLE "service_pages_blocks_vps_pricing_cards_plans" CASCADE;
  DROP TABLE "service_pages_blocks_vps_pricing_cards_plans_locales" CASCADE;
  ALTER TABLE "service_pages_blocks_vps_pricing_cards" ADD COLUMN "recommended_product_id" varchar;`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "service_pages_blocks_vps_pricing_cards_plans_spec_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "service_pages_blocks_vps_pricing_cards_plans_spec_bullets_locales" (
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "service_pages_blocks_vps_pricing_cards_plans" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"hostbill_product_id" varchar NOT NULL
  );
  
  CREATE TABLE "service_pages_blocks_vps_pricing_cards_plans_locales" (
  	"display_name" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  ALTER TABLE "service_pages_blocks_vps_pricing_cards_plans_spec_bullets" ADD CONSTRAINT "service_pages_blocks_vps_pricing_cards_plans_spec_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."service_pages_blocks_vps_pricing_cards_plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "service_pages_blocks_vps_pricing_cards_plans_spec_bullets_locales" ADD CONSTRAINT "service_pages_blocks_vps_pricing_cards_plans_spec_bullets_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."service_pages_blocks_vps_pricing_cards_plans_spec_bullets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "service_pages_blocks_vps_pricing_cards_plans" ADD CONSTRAINT "service_pages_blocks_vps_pricing_cards_plans_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."service_pages_blocks_vps_pricing_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "service_pages_blocks_vps_pricing_cards_plans_locales" ADD CONSTRAINT "service_pages_blocks_vps_pricing_cards_plans_locales_pare_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."service_pages_blocks_vps_pricing_cards_plans"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "service_pages_blocks_vps_pricing_cards_plans_spec_bullets_order_idx" ON "service_pages_blocks_vps_pricing_cards_plans_spec_bullets" USING btree ("_order");
  CREATE INDEX "service_pages_blocks_vps_pricing_cards_plans_spec_bullets_parent_id_idx" ON "service_pages_blocks_vps_pricing_cards_plans_spec_bullets" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "service_pages_blocks_vps_pricing_cards_plans_spec_bullets_lo" ON "service_pages_blocks_vps_pricing_cards_plans_spec_bullets_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "service_pages_blocks_vps_pricing_cards_plans_order_idx" ON "service_pages_blocks_vps_pricing_cards_plans" USING btree ("_order");
  CREATE INDEX "service_pages_blocks_vps_pricing_cards_plans_parent_id_idx" ON "service_pages_blocks_vps_pricing_cards_plans" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "service_pages_blocks_vps_pricing_cards_plans_locales_locale_" ON "service_pages_blocks_vps_pricing_cards_plans_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "service_pages_blocks_vps_pricing_cards" DROP COLUMN "recommended_product_id";`)
}
