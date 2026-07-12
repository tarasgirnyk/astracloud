import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('ua', 'en', 'pl');
  CREATE TABLE "pages_blocks_partners_partners" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"href" varchar
  );
  
  CREATE TABLE "pages_blocks_partners" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_services_services_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_services_services_checklist" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_services_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"anchor_id" varchar,
  	"eyebrow" varchar,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"cta_label" varchar,
  	"cta_href" varchar
  );
  
  CREATE TABLE "pages_blocks_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar NOT NULL,
  	"subheading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_advantages_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_advantages_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"title" varchar NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_advantages" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar NOT NULL,
  	"description" varchar,
  	"tagline" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_pricing_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_pricing_filter_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"selected" boolean DEFAULT false
  );
  
  CREATE TABLE "pages_blocks_pricing_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_pricing_rows_by_tab_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"plan" varchar NOT NULL,
  	"cpu" varchar NOT NULL,
  	"ram" varchar NOT NULL,
  	"disk" varchar NOT NULL,
  	"price" varchar NOT NULL,
  	"highlighted" boolean DEFAULT false
  );
  
  CREATE TABLE "pages_blocks_pricing_rows_by_tab" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tab_value" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_pricing_payment_methods" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_pricing" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar NOT NULL,
  	"subheading" varchar,
  	"payment_methods_label" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_consultation" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar NOT NULL,
  	"subheading" varchar,
  	"cta_label" varchar,
  	"cta_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "site_chrome_nav_links_children" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "site_chrome_locales" (
  	"cabinet_label" varchar,
  	"footer_address" varchar,
  	"copyright_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "site_chrome_nav_links" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "site_chrome_footer_columns_links" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "site_chrome_footer_columns" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "site_chrome" ADD COLUMN "cabinet_href" varchar;
  ALTER TABLE "pages_blocks_partners_partners" ADD CONSTRAINT "pages_blocks_partners_partners_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_partners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_partners" ADD CONSTRAINT "pages_blocks_partners_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_services_services_bullets" ADD CONSTRAINT "pages_blocks_services_services_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_services_services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_services_services_checklist" ADD CONSTRAINT "pages_blocks_services_services_checklist_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_services_services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_services_services" ADD CONSTRAINT "pages_blocks_services_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_services" ADD CONSTRAINT "pages_blocks_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_advantages_bullets" ADD CONSTRAINT "pages_blocks_advantages_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_advantages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_advantages_grid" ADD CONSTRAINT "pages_blocks_advantages_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_advantages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_advantages" ADD CONSTRAINT "pages_blocks_advantages_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing_tabs" ADD CONSTRAINT "pages_blocks_pricing_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_pricing"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing_filter_tags" ADD CONSTRAINT "pages_blocks_pricing_filter_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_pricing"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing_columns" ADD CONSTRAINT "pages_blocks_pricing_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_pricing"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing_rows_by_tab_rows" ADD CONSTRAINT "pages_blocks_pricing_rows_by_tab_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_pricing_rows_by_tab"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing_rows_by_tab" ADD CONSTRAINT "pages_blocks_pricing_rows_by_tab_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_pricing"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing_payment_methods" ADD CONSTRAINT "pages_blocks_pricing_payment_methods_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_pricing"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing" ADD CONSTRAINT "pages_blocks_pricing_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_items" ADD CONSTRAINT "pages_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq" ADD CONSTRAINT "pages_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_consultation" ADD CONSTRAINT "pages_blocks_consultation_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_chrome_nav_links_children" ADD CONSTRAINT "site_chrome_nav_links_children_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_chrome_nav_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_chrome_locales" ADD CONSTRAINT "site_chrome_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_chrome"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_partners_partners_order_idx" ON "pages_blocks_partners_partners" USING btree ("_order");
  CREATE INDEX "pages_blocks_partners_partners_parent_id_idx" ON "pages_blocks_partners_partners" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_partners_order_idx" ON "pages_blocks_partners" USING btree ("_order");
  CREATE INDEX "pages_blocks_partners_parent_id_idx" ON "pages_blocks_partners" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_partners_path_idx" ON "pages_blocks_partners" USING btree ("_path");
  CREATE INDEX "pages_blocks_services_services_bullets_order_idx" ON "pages_blocks_services_services_bullets" USING btree ("_order");
  CREATE INDEX "pages_blocks_services_services_bullets_parent_id_idx" ON "pages_blocks_services_services_bullets" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_services_services_checklist_order_idx" ON "pages_blocks_services_services_checklist" USING btree ("_order");
  CREATE INDEX "pages_blocks_services_services_checklist_parent_id_idx" ON "pages_blocks_services_services_checklist" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_services_services_order_idx" ON "pages_blocks_services_services" USING btree ("_order");
  CREATE INDEX "pages_blocks_services_services_parent_id_idx" ON "pages_blocks_services_services" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_services_order_idx" ON "pages_blocks_services" USING btree ("_order");
  CREATE INDEX "pages_blocks_services_parent_id_idx" ON "pages_blocks_services" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_services_path_idx" ON "pages_blocks_services" USING btree ("_path");
  CREATE INDEX "pages_blocks_advantages_bullets_order_idx" ON "pages_blocks_advantages_bullets" USING btree ("_order");
  CREATE INDEX "pages_blocks_advantages_bullets_parent_id_idx" ON "pages_blocks_advantages_bullets" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_advantages_grid_order_idx" ON "pages_blocks_advantages_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_advantages_grid_parent_id_idx" ON "pages_blocks_advantages_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_advantages_order_idx" ON "pages_blocks_advantages" USING btree ("_order");
  CREATE INDEX "pages_blocks_advantages_parent_id_idx" ON "pages_blocks_advantages" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_advantages_path_idx" ON "pages_blocks_advantages" USING btree ("_path");
  CREATE INDEX "pages_blocks_pricing_tabs_order_idx" ON "pages_blocks_pricing_tabs" USING btree ("_order");
  CREATE INDEX "pages_blocks_pricing_tabs_parent_id_idx" ON "pages_blocks_pricing_tabs" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pricing_filter_tags_order_idx" ON "pages_blocks_pricing_filter_tags" USING btree ("_order");
  CREATE INDEX "pages_blocks_pricing_filter_tags_parent_id_idx" ON "pages_blocks_pricing_filter_tags" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pricing_columns_order_idx" ON "pages_blocks_pricing_columns" USING btree ("_order");
  CREATE INDEX "pages_blocks_pricing_columns_parent_id_idx" ON "pages_blocks_pricing_columns" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pricing_rows_by_tab_rows_order_idx" ON "pages_blocks_pricing_rows_by_tab_rows" USING btree ("_order");
  CREATE INDEX "pages_blocks_pricing_rows_by_tab_rows_parent_id_idx" ON "pages_blocks_pricing_rows_by_tab_rows" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pricing_rows_by_tab_order_idx" ON "pages_blocks_pricing_rows_by_tab" USING btree ("_order");
  CREATE INDEX "pages_blocks_pricing_rows_by_tab_parent_id_idx" ON "pages_blocks_pricing_rows_by_tab" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pricing_payment_methods_order_idx" ON "pages_blocks_pricing_payment_methods" USING btree ("_order");
  CREATE INDEX "pages_blocks_pricing_payment_methods_parent_id_idx" ON "pages_blocks_pricing_payment_methods" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pricing_order_idx" ON "pages_blocks_pricing" USING btree ("_order");
  CREATE INDEX "pages_blocks_pricing_parent_id_idx" ON "pages_blocks_pricing" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pricing_path_idx" ON "pages_blocks_pricing" USING btree ("_path");
  CREATE INDEX "pages_blocks_faq_items_order_idx" ON "pages_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_items_parent_id_idx" ON "pages_blocks_faq_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_order_idx" ON "pages_blocks_faq" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_parent_id_idx" ON "pages_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_path_idx" ON "pages_blocks_faq" USING btree ("_path");
  CREATE INDEX "pages_blocks_consultation_order_idx" ON "pages_blocks_consultation" USING btree ("_order");
  CREATE INDEX "pages_blocks_consultation_parent_id_idx" ON "pages_blocks_consultation" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_consultation_path_idx" ON "pages_blocks_consultation" USING btree ("_path");
  CREATE INDEX "site_chrome_nav_links_children_order_idx" ON "site_chrome_nav_links_children" USING btree ("_order");
  CREATE INDEX "site_chrome_nav_links_children_parent_id_idx" ON "site_chrome_nav_links_children" USING btree ("_parent_id");
  CREATE INDEX "site_chrome_nav_links_children_locale_idx" ON "site_chrome_nav_links_children" USING btree ("_locale");
  CREATE UNIQUE INDEX "site_chrome_locales_locale_parent_id_unique" ON "site_chrome_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "site_chrome_nav_links_locale_idx" ON "site_chrome_nav_links" USING btree ("_locale");
  CREATE INDEX "site_chrome_footer_columns_links_locale_idx" ON "site_chrome_footer_columns_links" USING btree ("_locale");
  CREATE INDEX "site_chrome_footer_columns_locale_idx" ON "site_chrome_footer_columns" USING btree ("_locale");`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_partners_partners" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_partners" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_services_services_bullets" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_services_services_checklist" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_services_services" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_services" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_advantages_bullets" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_advantages_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_advantages" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_pricing_tabs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_pricing_filter_tags" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_pricing_columns" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_pricing_rows_by_tab_rows" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_pricing_rows_by_tab" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_pricing_payment_methods" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_pricing" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_faq_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_faq" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_consultation" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_chrome_nav_links_children" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_chrome_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_partners_partners" CASCADE;
  DROP TABLE "pages_blocks_partners" CASCADE;
  DROP TABLE "pages_blocks_services_services_bullets" CASCADE;
  DROP TABLE "pages_blocks_services_services_checklist" CASCADE;
  DROP TABLE "pages_blocks_services_services" CASCADE;
  DROP TABLE "pages_blocks_services" CASCADE;
  DROP TABLE "pages_blocks_advantages_bullets" CASCADE;
  DROP TABLE "pages_blocks_advantages_grid" CASCADE;
  DROP TABLE "pages_blocks_advantages" CASCADE;
  DROP TABLE "pages_blocks_pricing_tabs" CASCADE;
  DROP TABLE "pages_blocks_pricing_filter_tags" CASCADE;
  DROP TABLE "pages_blocks_pricing_columns" CASCADE;
  DROP TABLE "pages_blocks_pricing_rows_by_tab_rows" CASCADE;
  DROP TABLE "pages_blocks_pricing_rows_by_tab" CASCADE;
  DROP TABLE "pages_blocks_pricing_payment_methods" CASCADE;
  DROP TABLE "pages_blocks_pricing" CASCADE;
  DROP TABLE "pages_blocks_faq_items" CASCADE;
  DROP TABLE "pages_blocks_faq" CASCADE;
  DROP TABLE "pages_blocks_consultation" CASCADE;
  DROP TABLE "site_chrome_nav_links_children" CASCADE;
  DROP TABLE "site_chrome_locales" CASCADE;
  DROP INDEX "site_chrome_nav_links_locale_idx";
  DROP INDEX "site_chrome_footer_columns_links_locale_idx";
  DROP INDEX "site_chrome_footer_columns_locale_idx";
  ALTER TABLE "site_chrome_nav_links" DROP COLUMN "_locale";
  ALTER TABLE "site_chrome_footer_columns_links" DROP COLUMN "_locale";
  ALTER TABLE "site_chrome_footer_columns" DROP COLUMN "_locale";
  ALTER TABLE "site_chrome" DROP COLUMN "cabinet_href";
  DROP TYPE "public"."_locales";`)
}
