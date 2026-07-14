import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_architecture_checklist" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_architecture_checklist_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_architecture" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_architecture_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_vps_pricing_cards_plans_spec_bullets" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_vps_pricing_cards_plans_spec_bullets_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_vps_pricing_cards_plans" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_vps_pricing_cards_plans_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_vps_pricing_cards" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_architecture_checklist" CASCADE;
  DROP TABLE "pages_blocks_architecture_checklist_locales" CASCADE;
  DROP TABLE "pages_blocks_architecture" CASCADE;
  DROP TABLE "pages_blocks_architecture_locales" CASCADE;
  DROP TABLE "pages_blocks_vps_pricing_cards_plans_spec_bullets" CASCADE;
  DROP TABLE "pages_blocks_vps_pricing_cards_plans_spec_bullets_locales" CASCADE;
  DROP TABLE "pages_blocks_vps_pricing_cards_plans" CASCADE;
  DROP TABLE "pages_blocks_vps_pricing_cards_plans_locales" CASCADE;
  DROP TABLE "pages_blocks_vps_pricing_cards" CASCADE;
  DROP INDEX "slug_locale_idx";
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  ALTER TABLE "pages" DROP COLUMN "locale";
  DROP TYPE "public"."enum_pages_locale";`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_locale" AS ENUM('ua', 'en', 'pl');
  CREATE TABLE "pages_blocks_architecture_checklist" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_architecture_checklist_locales" (
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_architecture" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_architecture_locales" (
  	"heading" varchar NOT NULL,
  	"subheading" varchar,
  	"description" varchar,
  	"checklist_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_vps_pricing_cards_plans_spec_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_vps_pricing_cards_plans_spec_bullets_locales" (
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_vps_pricing_cards_plans" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"hostbill_product_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_vps_pricing_cards_plans_locales" (
  	"display_name" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_vps_pricing_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"hostbill_category_id" varchar NOT NULL,
  	"block_name" varchar
  );
  
  DROP INDEX "pages_slug_idx";
  ALTER TABLE "pages" ADD COLUMN "locale" "enum_pages_locale" DEFAULT 'ua' NOT NULL;
  ALTER TABLE "pages_blocks_architecture_checklist" ADD CONSTRAINT "pages_blocks_architecture_checklist_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_architecture"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_architecture_checklist_locales" ADD CONSTRAINT "pages_blocks_architecture_checklist_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_architecture_checklist"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_architecture" ADD CONSTRAINT "pages_blocks_architecture_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_architecture_locales" ADD CONSTRAINT "pages_blocks_architecture_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_architecture"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_vps_pricing_cards_plans_spec_bullets" ADD CONSTRAINT "pages_blocks_vps_pricing_cards_plans_spec_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_vps_pricing_cards_plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_vps_pricing_cards_plans_spec_bullets_locales" ADD CONSTRAINT "pages_blocks_vps_pricing_cards_plans_spec_bullets_locales_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_vps_pricing_cards_plans_spec_bullets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_vps_pricing_cards_plans" ADD CONSTRAINT "pages_blocks_vps_pricing_cards_plans_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_vps_pricing_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_vps_pricing_cards_plans_locales" ADD CONSTRAINT "pages_blocks_vps_pricing_cards_plans_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_vps_pricing_cards_plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_vps_pricing_cards" ADD CONSTRAINT "pages_blocks_vps_pricing_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_architecture_checklist_order_idx" ON "pages_blocks_architecture_checklist" USING btree ("_order");
  CREATE INDEX "pages_blocks_architecture_checklist_parent_id_idx" ON "pages_blocks_architecture_checklist" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_architecture_checklist_locales_locale_parent_id" ON "pages_blocks_architecture_checklist_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_architecture_order_idx" ON "pages_blocks_architecture" USING btree ("_order");
  CREATE INDEX "pages_blocks_architecture_parent_id_idx" ON "pages_blocks_architecture" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_architecture_path_idx" ON "pages_blocks_architecture" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_architecture_locales_locale_parent_id_unique" ON "pages_blocks_architecture_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_vps_pricing_cards_plans_spec_bullets_order_idx" ON "pages_blocks_vps_pricing_cards_plans_spec_bullets" USING btree ("_order");
  CREATE INDEX "pages_blocks_vps_pricing_cards_plans_spec_bullets_parent_id_idx" ON "pages_blocks_vps_pricing_cards_plans_spec_bullets" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_vps_pricing_cards_plans_spec_bullets_locales_lo" ON "pages_blocks_vps_pricing_cards_plans_spec_bullets_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_vps_pricing_cards_plans_order_idx" ON "pages_blocks_vps_pricing_cards_plans" USING btree ("_order");
  CREATE INDEX "pages_blocks_vps_pricing_cards_plans_parent_id_idx" ON "pages_blocks_vps_pricing_cards_plans" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_vps_pricing_cards_plans_locales_locale_parent_i" ON "pages_blocks_vps_pricing_cards_plans_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_vps_pricing_cards_order_idx" ON "pages_blocks_vps_pricing_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_vps_pricing_cards_parent_id_idx" ON "pages_blocks_vps_pricing_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_vps_pricing_cards_path_idx" ON "pages_blocks_vps_pricing_cards" USING btree ("_path");
  CREATE UNIQUE INDEX "slug_locale_idx" ON "pages" USING btree ("slug","locale");`)
}
