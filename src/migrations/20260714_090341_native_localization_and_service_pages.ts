import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_service_pages_blocks_hero_image_fit" AS ENUM('cover', 'contain');
  CREATE TYPE "public"."enum_service_pages_blocks_consultation_tone" AS ENUM('dark', 'light');
  CREATE TYPE "public"."enum_service_pages_blocks_advantages_tone" AS ENUM('dark', 'light');
  CREATE TYPE "public"."enum_service_pages_publication_status" AS ENUM('draft', 'published');
  CREATE TABLE "pages_blocks_hero_locales" (
  	"heading" varchar NOT NULL,
  	"subheading" varchar,
  	"tagline" varchar,
  	"cta_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_partners_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_services_services_bullets_locales" (
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_services_services_checklist_locales" (
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_services_services_locales" (
  	"eyebrow" varchar,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"cta_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_services_locales" (
  	"heading" varchar NOT NULL,
  	"subheading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_advantages_bullets_locales" (
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_advantages_grid_locales" (
  	"title" varchar NOT NULL,
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_advantages_locales" (
  	"eyebrow" varchar,
  	"heading" varchar NOT NULL,
  	"description" varchar,
  	"tagline" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_pricing_tabs_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_pricing_filter_tags_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_pricing_columns_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_pricing_rows_by_tab_rows_locales" (
  	"plan" varchar NOT NULL,
  	"cpu" varchar NOT NULL,
  	"ram" varchar NOT NULL,
  	"disk" varchar NOT NULL,
  	"price" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_pricing_locales" (
  	"heading" varchar NOT NULL,
  	"subheading" varchar,
  	"no_data_message" varchar,
  	"payment_methods_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_faq_items_locales" (
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_faq_locales" (
  	"heading" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_consultation_locales" (
  	"heading" varchar NOT NULL,
  	"subheading" varchar,
  	"cta_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_simple_content_locales" (
  	"page_title" varchar,
  	"content" jsonb NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_documents_items_locales" (
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_documents_locales" (
  	"heading" varchar NOT NULL,
  	"intro" varchar,
  	"view_link_label" varchar,
  	"download_link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_architecture_checklist_locales" (
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
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
  
  CREATE TABLE "pages_blocks_vps_pricing_cards_plans_spec_bullets_locales" (
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_vps_pricing_cards_plans_locales" (
  	"display_name" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "service_pages_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_src" varchar DEFAULT '/images/hero3.png',
  	"image_fit" "enum_service_pages_blocks_hero_image_fit" DEFAULT 'cover',
  	"cta_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "service_pages_blocks_hero_locales" (
  	"heading" varchar NOT NULL,
  	"subheading" varchar,
  	"tagline" varchar,
  	"cta_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "service_pages_blocks_partners_partners" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"href" varchar
  );
  
  CREATE TABLE "service_pages_blocks_partners" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "service_pages_blocks_partners_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
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
  
  CREATE TABLE "service_pages_blocks_vps_pricing_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"hostbill_category_id" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "service_pages_blocks_consultation" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tone" "enum_service_pages_blocks_consultation_tone" DEFAULT 'dark',
  	"cta_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "service_pages_blocks_consultation_locales" (
  	"heading" varchar NOT NULL,
  	"subheading" varchar,
  	"cta_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "service_pages_blocks_architecture_checklist" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "service_pages_blocks_architecture_checklist_locales" (
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "service_pages_blocks_architecture" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "service_pages_blocks_architecture_locales" (
  	"heading" varchar NOT NULL,
  	"subheading" varchar,
  	"description" varchar,
  	"checklist_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "service_pages_blocks_advantages_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "service_pages_blocks_advantages_bullets_locales" (
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "service_pages_blocks_advantages_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar
  );
  
  CREATE TABLE "service_pages_blocks_advantages_grid_locales" (
  	"title" varchar NOT NULL,
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "service_pages_blocks_advantages" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tone" "enum_service_pages_blocks_advantages_tone" DEFAULT 'dark',
  	"block_name" varchar
  );
  
  CREATE TABLE "service_pages_blocks_advantages_locales" (
  	"eyebrow" varchar,
  	"heading" varchar NOT NULL,
  	"description" varchar,
  	"tagline" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "service_pages_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "service_pages_blocks_faq_items_locales" (
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "service_pages_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "service_pages_blocks_faq_locales" (
  	"heading" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "service_pages_blocks_simple_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "service_pages_blocks_simple_content_locales" (
  	"page_title" varchar,
  	"content" jsonb NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "service_pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"publication_status" "enum_service_pages_publication_status" DEFAULT 'draft' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "service_pages_id" integer;
  ALTER TABLE "pages_blocks_hero_locales" ADD CONSTRAINT "pages_blocks_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_partners_locales" ADD CONSTRAINT "pages_blocks_partners_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_partners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_services_services_bullets_locales" ADD CONSTRAINT "pages_blocks_services_services_bullets_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_services_services_bullets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_services_services_checklist_locales" ADD CONSTRAINT "pages_blocks_services_services_checklist_locales_parent_i_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_services_services_checklist"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_services_services_locales" ADD CONSTRAINT "pages_blocks_services_services_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_services_services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_services_locales" ADD CONSTRAINT "pages_blocks_services_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_advantages_bullets_locales" ADD CONSTRAINT "pages_blocks_advantages_bullets_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_advantages_bullets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_advantages_grid_locales" ADD CONSTRAINT "pages_blocks_advantages_grid_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_advantages_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_advantages_locales" ADD CONSTRAINT "pages_blocks_advantages_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_advantages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing_tabs_locales" ADD CONSTRAINT "pages_blocks_pricing_tabs_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_pricing_tabs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing_filter_tags_locales" ADD CONSTRAINT "pages_blocks_pricing_filter_tags_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_pricing_filter_tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing_columns_locales" ADD CONSTRAINT "pages_blocks_pricing_columns_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_pricing_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing_rows_by_tab_rows_locales" ADD CONSTRAINT "pages_blocks_pricing_rows_by_tab_rows_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_pricing_rows_by_tab_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing_locales" ADD CONSTRAINT "pages_blocks_pricing_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_pricing"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_items_locales" ADD CONSTRAINT "pages_blocks_faq_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_locales" ADD CONSTRAINT "pages_blocks_faq_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_consultation_locales" ADD CONSTRAINT "pages_blocks_consultation_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_consultation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_simple_content_locales" ADD CONSTRAINT "pages_blocks_simple_content_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_simple_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_documents_items_locales" ADD CONSTRAINT "pages_blocks_documents_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_documents_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_documents_locales" ADD CONSTRAINT "pages_blocks_documents_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_architecture_checklist_locales" ADD CONSTRAINT "pages_blocks_architecture_checklist_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_architecture_checklist"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_architecture_locales" ADD CONSTRAINT "pages_blocks_architecture_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_architecture"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_vps_pricing_cards_plans_spec_bullets_locales" ADD CONSTRAINT "pages_blocks_vps_pricing_cards_plans_spec_bullets_locales_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_vps_pricing_cards_plans_spec_bullets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_vps_pricing_cards_plans_locales" ADD CONSTRAINT "pages_blocks_vps_pricing_cards_plans_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_vps_pricing_cards_plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "service_pages_blocks_hero" ADD CONSTRAINT "service_pages_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."service_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "service_pages_blocks_hero_locales" ADD CONSTRAINT "service_pages_blocks_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."service_pages_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "service_pages_blocks_partners_partners" ADD CONSTRAINT "service_pages_blocks_partners_partners_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."service_pages_blocks_partners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "service_pages_blocks_partners" ADD CONSTRAINT "service_pages_blocks_partners_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."service_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "service_pages_blocks_partners_locales" ADD CONSTRAINT "service_pages_blocks_partners_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."service_pages_blocks_partners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "service_pages_blocks_vps_pricing_cards_plans_spec_bullets" ADD CONSTRAINT "service_pages_blocks_vps_pricing_cards_plans_spec_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."service_pages_blocks_vps_pricing_cards_plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "service_pages_blocks_vps_pricing_cards_plans_spec_bullets_locales" ADD CONSTRAINT "service_pages_blocks_vps_pricing_cards_plans_spec_bullets_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."service_pages_blocks_vps_pricing_cards_plans_spec_bullets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "service_pages_blocks_vps_pricing_cards_plans" ADD CONSTRAINT "service_pages_blocks_vps_pricing_cards_plans_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."service_pages_blocks_vps_pricing_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "service_pages_blocks_vps_pricing_cards_plans_locales" ADD CONSTRAINT "service_pages_blocks_vps_pricing_cards_plans_locales_pare_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."service_pages_blocks_vps_pricing_cards_plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "service_pages_blocks_vps_pricing_cards" ADD CONSTRAINT "service_pages_blocks_vps_pricing_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."service_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "service_pages_blocks_consultation" ADD CONSTRAINT "service_pages_blocks_consultation_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."service_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "service_pages_blocks_consultation_locales" ADD CONSTRAINT "service_pages_blocks_consultation_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."service_pages_blocks_consultation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "service_pages_blocks_architecture_checklist" ADD CONSTRAINT "service_pages_blocks_architecture_checklist_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."service_pages_blocks_architecture"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "service_pages_blocks_architecture_checklist_locales" ADD CONSTRAINT "service_pages_blocks_architecture_checklist_locales_paren_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."service_pages_blocks_architecture_checklist"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "service_pages_blocks_architecture" ADD CONSTRAINT "service_pages_blocks_architecture_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."service_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "service_pages_blocks_architecture_locales" ADD CONSTRAINT "service_pages_blocks_architecture_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."service_pages_blocks_architecture"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "service_pages_blocks_advantages_bullets" ADD CONSTRAINT "service_pages_blocks_advantages_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."service_pages_blocks_advantages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "service_pages_blocks_advantages_bullets_locales" ADD CONSTRAINT "service_pages_blocks_advantages_bullets_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."service_pages_blocks_advantages_bullets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "service_pages_blocks_advantages_grid" ADD CONSTRAINT "service_pages_blocks_advantages_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."service_pages_blocks_advantages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "service_pages_blocks_advantages_grid_locales" ADD CONSTRAINT "service_pages_blocks_advantages_grid_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."service_pages_blocks_advantages_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "service_pages_blocks_advantages" ADD CONSTRAINT "service_pages_blocks_advantages_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."service_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "service_pages_blocks_advantages_locales" ADD CONSTRAINT "service_pages_blocks_advantages_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."service_pages_blocks_advantages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "service_pages_blocks_faq_items" ADD CONSTRAINT "service_pages_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."service_pages_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "service_pages_blocks_faq_items_locales" ADD CONSTRAINT "service_pages_blocks_faq_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."service_pages_blocks_faq_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "service_pages_blocks_faq" ADD CONSTRAINT "service_pages_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."service_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "service_pages_blocks_faq_locales" ADD CONSTRAINT "service_pages_blocks_faq_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."service_pages_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "service_pages_blocks_simple_content" ADD CONSTRAINT "service_pages_blocks_simple_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."service_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "service_pages_blocks_simple_content_locales" ADD CONSTRAINT "service_pages_blocks_simple_content_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."service_pages_blocks_simple_content"("id") ON DELETE cascade ON UPDATE no action;
  CREATE UNIQUE INDEX "pages_blocks_hero_locales_locale_parent_id_unique" ON "pages_blocks_hero_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_partners_locales_locale_parent_id_unique" ON "pages_blocks_partners_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_services_services_bullets_locales_locale_parent" ON "pages_blocks_services_services_bullets_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_services_services_checklist_locales_locale_pare" ON "pages_blocks_services_services_checklist_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_services_services_locales_locale_parent_id_uniq" ON "pages_blocks_services_services_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_services_locales_locale_parent_id_unique" ON "pages_blocks_services_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_advantages_bullets_locales_locale_parent_id_uni" ON "pages_blocks_advantages_bullets_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_advantages_grid_locales_locale_parent_id_unique" ON "pages_blocks_advantages_grid_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_advantages_locales_locale_parent_id_unique" ON "pages_blocks_advantages_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_pricing_tabs_locales_locale_parent_id_unique" ON "pages_blocks_pricing_tabs_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_pricing_filter_tags_locales_locale_parent_id_un" ON "pages_blocks_pricing_filter_tags_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_pricing_columns_locales_locale_parent_id_unique" ON "pages_blocks_pricing_columns_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_pricing_rows_by_tab_rows_locales_locale_parent_" ON "pages_blocks_pricing_rows_by_tab_rows_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_pricing_locales_locale_parent_id_unique" ON "pages_blocks_pricing_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_faq_items_locales_locale_parent_id_unique" ON "pages_blocks_faq_items_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_faq_locales_locale_parent_id_unique" ON "pages_blocks_faq_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_consultation_locales_locale_parent_id_unique" ON "pages_blocks_consultation_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_simple_content_locales_locale_parent_id_unique" ON "pages_blocks_simple_content_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_documents_items_locales_locale_parent_id_unique" ON "pages_blocks_documents_items_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_documents_locales_locale_parent_id_unique" ON "pages_blocks_documents_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_architecture_checklist_locales_locale_parent_id" ON "pages_blocks_architecture_checklist_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_architecture_locales_locale_parent_id_unique" ON "pages_blocks_architecture_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_vps_pricing_cards_plans_spec_bullets_locales_lo" ON "pages_blocks_vps_pricing_cards_plans_spec_bullets_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_vps_pricing_cards_plans_locales_locale_parent_i" ON "pages_blocks_vps_pricing_cards_plans_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "service_pages_blocks_hero_order_idx" ON "service_pages_blocks_hero" USING btree ("_order");
  CREATE INDEX "service_pages_blocks_hero_parent_id_idx" ON "service_pages_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "service_pages_blocks_hero_path_idx" ON "service_pages_blocks_hero" USING btree ("_path");
  CREATE UNIQUE INDEX "service_pages_blocks_hero_locales_locale_parent_id_unique" ON "service_pages_blocks_hero_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "service_pages_blocks_partners_partners_order_idx" ON "service_pages_blocks_partners_partners" USING btree ("_order");
  CREATE INDEX "service_pages_blocks_partners_partners_parent_id_idx" ON "service_pages_blocks_partners_partners" USING btree ("_parent_id");
  CREATE INDEX "service_pages_blocks_partners_order_idx" ON "service_pages_blocks_partners" USING btree ("_order");
  CREATE INDEX "service_pages_blocks_partners_parent_id_idx" ON "service_pages_blocks_partners" USING btree ("_parent_id");
  CREATE INDEX "service_pages_blocks_partners_path_idx" ON "service_pages_blocks_partners" USING btree ("_path");
  CREATE UNIQUE INDEX "service_pages_blocks_partners_locales_locale_parent_id_uniqu" ON "service_pages_blocks_partners_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "service_pages_blocks_vps_pricing_cards_plans_spec_bullets_order_idx" ON "service_pages_blocks_vps_pricing_cards_plans_spec_bullets" USING btree ("_order");
  CREATE INDEX "service_pages_blocks_vps_pricing_cards_plans_spec_bullets_parent_id_idx" ON "service_pages_blocks_vps_pricing_cards_plans_spec_bullets" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "service_pages_blocks_vps_pricing_cards_plans_spec_bullets_lo" ON "service_pages_blocks_vps_pricing_cards_plans_spec_bullets_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "service_pages_blocks_vps_pricing_cards_plans_order_idx" ON "service_pages_blocks_vps_pricing_cards_plans" USING btree ("_order");
  CREATE INDEX "service_pages_blocks_vps_pricing_cards_plans_parent_id_idx" ON "service_pages_blocks_vps_pricing_cards_plans" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "service_pages_blocks_vps_pricing_cards_plans_locales_locale_" ON "service_pages_blocks_vps_pricing_cards_plans_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "service_pages_blocks_vps_pricing_cards_order_idx" ON "service_pages_blocks_vps_pricing_cards" USING btree ("_order");
  CREATE INDEX "service_pages_blocks_vps_pricing_cards_parent_id_idx" ON "service_pages_blocks_vps_pricing_cards" USING btree ("_parent_id");
  CREATE INDEX "service_pages_blocks_vps_pricing_cards_path_idx" ON "service_pages_blocks_vps_pricing_cards" USING btree ("_path");
  CREATE INDEX "service_pages_blocks_consultation_order_idx" ON "service_pages_blocks_consultation" USING btree ("_order");
  CREATE INDEX "service_pages_blocks_consultation_parent_id_idx" ON "service_pages_blocks_consultation" USING btree ("_parent_id");
  CREATE INDEX "service_pages_blocks_consultation_path_idx" ON "service_pages_blocks_consultation" USING btree ("_path");
  CREATE UNIQUE INDEX "service_pages_blocks_consultation_locales_locale_parent_id_u" ON "service_pages_blocks_consultation_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "service_pages_blocks_architecture_checklist_order_idx" ON "service_pages_blocks_architecture_checklist" USING btree ("_order");
  CREATE INDEX "service_pages_blocks_architecture_checklist_parent_id_idx" ON "service_pages_blocks_architecture_checklist" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "service_pages_blocks_architecture_checklist_locales_locale_p" ON "service_pages_blocks_architecture_checklist_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "service_pages_blocks_architecture_order_idx" ON "service_pages_blocks_architecture" USING btree ("_order");
  CREATE INDEX "service_pages_blocks_architecture_parent_id_idx" ON "service_pages_blocks_architecture" USING btree ("_parent_id");
  CREATE INDEX "service_pages_blocks_architecture_path_idx" ON "service_pages_blocks_architecture" USING btree ("_path");
  CREATE UNIQUE INDEX "service_pages_blocks_architecture_locales_locale_parent_id_u" ON "service_pages_blocks_architecture_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "service_pages_blocks_advantages_bullets_order_idx" ON "service_pages_blocks_advantages_bullets" USING btree ("_order");
  CREATE INDEX "service_pages_blocks_advantages_bullets_parent_id_idx" ON "service_pages_blocks_advantages_bullets" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "service_pages_blocks_advantages_bullets_locales_locale_paren" ON "service_pages_blocks_advantages_bullets_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "service_pages_blocks_advantages_grid_order_idx" ON "service_pages_blocks_advantages_grid" USING btree ("_order");
  CREATE INDEX "service_pages_blocks_advantages_grid_parent_id_idx" ON "service_pages_blocks_advantages_grid" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "service_pages_blocks_advantages_grid_locales_locale_parent_i" ON "service_pages_blocks_advantages_grid_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "service_pages_blocks_advantages_order_idx" ON "service_pages_blocks_advantages" USING btree ("_order");
  CREATE INDEX "service_pages_blocks_advantages_parent_id_idx" ON "service_pages_blocks_advantages" USING btree ("_parent_id");
  CREATE INDEX "service_pages_blocks_advantages_path_idx" ON "service_pages_blocks_advantages" USING btree ("_path");
  CREATE UNIQUE INDEX "service_pages_blocks_advantages_locales_locale_parent_id_uni" ON "service_pages_blocks_advantages_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "service_pages_blocks_faq_items_order_idx" ON "service_pages_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "service_pages_blocks_faq_items_parent_id_idx" ON "service_pages_blocks_faq_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "service_pages_blocks_faq_items_locales_locale_parent_id_uniq" ON "service_pages_blocks_faq_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "service_pages_blocks_faq_order_idx" ON "service_pages_blocks_faq" USING btree ("_order");
  CREATE INDEX "service_pages_blocks_faq_parent_id_idx" ON "service_pages_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "service_pages_blocks_faq_path_idx" ON "service_pages_blocks_faq" USING btree ("_path");
  CREATE UNIQUE INDEX "service_pages_blocks_faq_locales_locale_parent_id_unique" ON "service_pages_blocks_faq_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "service_pages_blocks_simple_content_order_idx" ON "service_pages_blocks_simple_content" USING btree ("_order");
  CREATE INDEX "service_pages_blocks_simple_content_parent_id_idx" ON "service_pages_blocks_simple_content" USING btree ("_parent_id");
  CREATE INDEX "service_pages_blocks_simple_content_path_idx" ON "service_pages_blocks_simple_content" USING btree ("_path");
  CREATE UNIQUE INDEX "service_pages_blocks_simple_content_locales_locale_parent_id" ON "service_pages_blocks_simple_content_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "service_pages_slug_idx" ON "service_pages" USING btree ("slug");
  CREATE INDEX "service_pages_updated_at_idx" ON "service_pages" USING btree ("updated_at");
  CREATE INDEX "service_pages_created_at_idx" ON "service_pages" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_service_pages_fk" FOREIGN KEY ("service_pages_id") REFERENCES "public"."service_pages"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_service_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("service_pages_id");
  ALTER TABLE "pages_blocks_hero" DROP COLUMN "heading";
  ALTER TABLE "pages_blocks_hero" DROP COLUMN "subheading";
  ALTER TABLE "pages_blocks_hero" DROP COLUMN "tagline";
  ALTER TABLE "pages_blocks_hero" DROP COLUMN "cta_label";
  ALTER TABLE "pages_blocks_partners" DROP COLUMN "title";
  ALTER TABLE "pages_blocks_services_services_bullets" DROP COLUMN "text";
  ALTER TABLE "pages_blocks_services_services_checklist" DROP COLUMN "text";
  ALTER TABLE "pages_blocks_services_services" DROP COLUMN "eyebrow";
  ALTER TABLE "pages_blocks_services_services" DROP COLUMN "title";
  ALTER TABLE "pages_blocks_services_services" DROP COLUMN "description";
  ALTER TABLE "pages_blocks_services_services" DROP COLUMN "cta_label";
  ALTER TABLE "pages_blocks_services" DROP COLUMN "heading";
  ALTER TABLE "pages_blocks_services" DROP COLUMN "subheading";
  ALTER TABLE "pages_blocks_advantages_bullets" DROP COLUMN "text";
  ALTER TABLE "pages_blocks_advantages_grid" DROP COLUMN "title";
  ALTER TABLE "pages_blocks_advantages_grid" DROP COLUMN "text";
  ALTER TABLE "pages_blocks_advantages" DROP COLUMN "eyebrow";
  ALTER TABLE "pages_blocks_advantages" DROP COLUMN "heading";
  ALTER TABLE "pages_blocks_advantages" DROP COLUMN "description";
  ALTER TABLE "pages_blocks_advantages" DROP COLUMN "tagline";
  ALTER TABLE "pages_blocks_pricing_tabs" DROP COLUMN "label";
  ALTER TABLE "pages_blocks_pricing_filter_tags" DROP COLUMN "label";
  ALTER TABLE "pages_blocks_pricing_columns" DROP COLUMN "label";
  ALTER TABLE "pages_blocks_pricing_rows_by_tab_rows" DROP COLUMN "plan";
  ALTER TABLE "pages_blocks_pricing_rows_by_tab_rows" DROP COLUMN "cpu";
  ALTER TABLE "pages_blocks_pricing_rows_by_tab_rows" DROP COLUMN "ram";
  ALTER TABLE "pages_blocks_pricing_rows_by_tab_rows" DROP COLUMN "disk";
  ALTER TABLE "pages_blocks_pricing_rows_by_tab_rows" DROP COLUMN "price";
  ALTER TABLE "pages_blocks_pricing" DROP COLUMN "heading";
  ALTER TABLE "pages_blocks_pricing" DROP COLUMN "subheading";
  ALTER TABLE "pages_blocks_pricing" DROP COLUMN "no_data_message";
  ALTER TABLE "pages_blocks_pricing" DROP COLUMN "payment_methods_label";
  ALTER TABLE "pages_blocks_faq_items" DROP COLUMN "question";
  ALTER TABLE "pages_blocks_faq_items" DROP COLUMN "answer";
  ALTER TABLE "pages_blocks_faq" DROP COLUMN "heading";
  ALTER TABLE "pages_blocks_consultation" DROP COLUMN "heading";
  ALTER TABLE "pages_blocks_consultation" DROP COLUMN "subheading";
  ALTER TABLE "pages_blocks_consultation" DROP COLUMN "cta_label";
  ALTER TABLE "pages_blocks_simple_content" DROP COLUMN "page_title";
  ALTER TABLE "pages_blocks_simple_content" DROP COLUMN "content";
  ALTER TABLE "pages_blocks_documents_items" DROP COLUMN "title";
  ALTER TABLE "pages_blocks_documents" DROP COLUMN "heading";
  ALTER TABLE "pages_blocks_documents" DROP COLUMN "intro";
  ALTER TABLE "pages_blocks_documents" DROP COLUMN "view_link_label";
  ALTER TABLE "pages_blocks_documents" DROP COLUMN "download_link_label";
  ALTER TABLE "pages_blocks_architecture_checklist" DROP COLUMN "text";
  ALTER TABLE "pages_blocks_architecture" DROP COLUMN "heading";
  ALTER TABLE "pages_blocks_architecture" DROP COLUMN "subheading";
  ALTER TABLE "pages_blocks_architecture" DROP COLUMN "description";
  ALTER TABLE "pages_blocks_architecture" DROP COLUMN "checklist_label";
  ALTER TABLE "pages_blocks_vps_pricing_cards_plans_spec_bullets" DROP COLUMN "text";
  ALTER TABLE "pages_blocks_vps_pricing_cards_plans" DROP COLUMN "display_name";`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_hero_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_partners_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_services_services_bullets_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_services_services_checklist_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_services_services_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_services_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_advantages_bullets_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_advantages_grid_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_advantages_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_pricing_tabs_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_pricing_filter_tags_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_pricing_columns_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_pricing_rows_by_tab_rows_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_pricing_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_faq_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_faq_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_consultation_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_simple_content_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_documents_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_documents_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_architecture_checklist_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_architecture_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_vps_pricing_cards_plans_spec_bullets_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_vps_pricing_cards_plans_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "service_pages_blocks_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "service_pages_blocks_hero_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "service_pages_blocks_partners_partners" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "service_pages_blocks_partners" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "service_pages_blocks_partners_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "service_pages_blocks_vps_pricing_cards_plans_spec_bullets" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "service_pages_blocks_vps_pricing_cards_plans_spec_bullets_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "service_pages_blocks_vps_pricing_cards_plans" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "service_pages_blocks_vps_pricing_cards_plans_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "service_pages_blocks_vps_pricing_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "service_pages_blocks_consultation" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "service_pages_blocks_consultation_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "service_pages_blocks_architecture_checklist" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "service_pages_blocks_architecture_checklist_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "service_pages_blocks_architecture" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "service_pages_blocks_architecture_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "service_pages_blocks_advantages_bullets" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "service_pages_blocks_advantages_bullets_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "service_pages_blocks_advantages_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "service_pages_blocks_advantages_grid_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "service_pages_blocks_advantages" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "service_pages_blocks_advantages_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "service_pages_blocks_faq_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "service_pages_blocks_faq_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "service_pages_blocks_faq" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "service_pages_blocks_faq_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "service_pages_blocks_simple_content" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "service_pages_blocks_simple_content_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "service_pages" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_hero_locales" CASCADE;
  DROP TABLE "pages_blocks_partners_locales" CASCADE;
  DROP TABLE "pages_blocks_services_services_bullets_locales" CASCADE;
  DROP TABLE "pages_blocks_services_services_checklist_locales" CASCADE;
  DROP TABLE "pages_blocks_services_services_locales" CASCADE;
  DROP TABLE "pages_blocks_services_locales" CASCADE;
  DROP TABLE "pages_blocks_advantages_bullets_locales" CASCADE;
  DROP TABLE "pages_blocks_advantages_grid_locales" CASCADE;
  DROP TABLE "pages_blocks_advantages_locales" CASCADE;
  DROP TABLE "pages_blocks_pricing_tabs_locales" CASCADE;
  DROP TABLE "pages_blocks_pricing_filter_tags_locales" CASCADE;
  DROP TABLE "pages_blocks_pricing_columns_locales" CASCADE;
  DROP TABLE "pages_blocks_pricing_rows_by_tab_rows_locales" CASCADE;
  DROP TABLE "pages_blocks_pricing_locales" CASCADE;
  DROP TABLE "pages_blocks_faq_items_locales" CASCADE;
  DROP TABLE "pages_blocks_faq_locales" CASCADE;
  DROP TABLE "pages_blocks_consultation_locales" CASCADE;
  DROP TABLE "pages_blocks_simple_content_locales" CASCADE;
  DROP TABLE "pages_blocks_documents_items_locales" CASCADE;
  DROP TABLE "pages_blocks_documents_locales" CASCADE;
  DROP TABLE "pages_blocks_architecture_checklist_locales" CASCADE;
  DROP TABLE "pages_blocks_architecture_locales" CASCADE;
  DROP TABLE "pages_blocks_vps_pricing_cards_plans_spec_bullets_locales" CASCADE;
  DROP TABLE "pages_blocks_vps_pricing_cards_plans_locales" CASCADE;
  DROP TABLE "service_pages_blocks_hero" CASCADE;
  DROP TABLE "service_pages_blocks_hero_locales" CASCADE;
  DROP TABLE "service_pages_blocks_partners_partners" CASCADE;
  DROP TABLE "service_pages_blocks_partners" CASCADE;
  DROP TABLE "service_pages_blocks_partners_locales" CASCADE;
  DROP TABLE "service_pages_blocks_vps_pricing_cards_plans_spec_bullets" CASCADE;
  DROP TABLE "service_pages_blocks_vps_pricing_cards_plans_spec_bullets_locales" CASCADE;
  DROP TABLE "service_pages_blocks_vps_pricing_cards_plans" CASCADE;
  DROP TABLE "service_pages_blocks_vps_pricing_cards_plans_locales" CASCADE;
  DROP TABLE "service_pages_blocks_vps_pricing_cards" CASCADE;
  DROP TABLE "service_pages_blocks_consultation" CASCADE;
  DROP TABLE "service_pages_blocks_consultation_locales" CASCADE;
  DROP TABLE "service_pages_blocks_architecture_checklist" CASCADE;
  DROP TABLE "service_pages_blocks_architecture_checklist_locales" CASCADE;
  DROP TABLE "service_pages_blocks_architecture" CASCADE;
  DROP TABLE "service_pages_blocks_architecture_locales" CASCADE;
  DROP TABLE "service_pages_blocks_advantages_bullets" CASCADE;
  DROP TABLE "service_pages_blocks_advantages_bullets_locales" CASCADE;
  DROP TABLE "service_pages_blocks_advantages_grid" CASCADE;
  DROP TABLE "service_pages_blocks_advantages_grid_locales" CASCADE;
  DROP TABLE "service_pages_blocks_advantages" CASCADE;
  DROP TABLE "service_pages_blocks_advantages_locales" CASCADE;
  DROP TABLE "service_pages_blocks_faq_items" CASCADE;
  DROP TABLE "service_pages_blocks_faq_items_locales" CASCADE;
  DROP TABLE "service_pages_blocks_faq" CASCADE;
  DROP TABLE "service_pages_blocks_faq_locales" CASCADE;
  DROP TABLE "service_pages_blocks_simple_content" CASCADE;
  DROP TABLE "service_pages_blocks_simple_content_locales" CASCADE;
  DROP TABLE "service_pages" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_service_pages_fk";
  
  DROP INDEX "payload_locked_documents_rels_service_pages_id_idx";
  ALTER TABLE "pages_blocks_hero" ADD COLUMN "heading" varchar NOT NULL;
  ALTER TABLE "pages_blocks_hero" ADD COLUMN "subheading" varchar;
  ALTER TABLE "pages_blocks_hero" ADD COLUMN "tagline" varchar;
  ALTER TABLE "pages_blocks_hero" ADD COLUMN "cta_label" varchar;
  ALTER TABLE "pages_blocks_partners" ADD COLUMN "title" varchar;
  ALTER TABLE "pages_blocks_services_services_bullets" ADD COLUMN "text" varchar NOT NULL;
  ALTER TABLE "pages_blocks_services_services_checklist" ADD COLUMN "text" varchar NOT NULL;
  ALTER TABLE "pages_blocks_services_services" ADD COLUMN "eyebrow" varchar;
  ALTER TABLE "pages_blocks_services_services" ADD COLUMN "title" varchar NOT NULL;
  ALTER TABLE "pages_blocks_services_services" ADD COLUMN "description" varchar NOT NULL;
  ALTER TABLE "pages_blocks_services_services" ADD COLUMN "cta_label" varchar;
  ALTER TABLE "pages_blocks_services" ADD COLUMN "heading" varchar NOT NULL;
  ALTER TABLE "pages_blocks_services" ADD COLUMN "subheading" varchar;
  ALTER TABLE "pages_blocks_advantages_bullets" ADD COLUMN "text" varchar NOT NULL;
  ALTER TABLE "pages_blocks_advantages_grid" ADD COLUMN "title" varchar NOT NULL;
  ALTER TABLE "pages_blocks_advantages_grid" ADD COLUMN "text" varchar NOT NULL;
  ALTER TABLE "pages_blocks_advantages" ADD COLUMN "eyebrow" varchar;
  ALTER TABLE "pages_blocks_advantages" ADD COLUMN "heading" varchar NOT NULL;
  ALTER TABLE "pages_blocks_advantages" ADD COLUMN "description" varchar;
  ALTER TABLE "pages_blocks_advantages" ADD COLUMN "tagline" varchar;
  ALTER TABLE "pages_blocks_pricing_tabs" ADD COLUMN "label" varchar NOT NULL;
  ALTER TABLE "pages_blocks_pricing_filter_tags" ADD COLUMN "label" varchar NOT NULL;
  ALTER TABLE "pages_blocks_pricing_columns" ADD COLUMN "label" varchar NOT NULL;
  ALTER TABLE "pages_blocks_pricing_rows_by_tab_rows" ADD COLUMN "plan" varchar NOT NULL;
  ALTER TABLE "pages_blocks_pricing_rows_by_tab_rows" ADD COLUMN "cpu" varchar NOT NULL;
  ALTER TABLE "pages_blocks_pricing_rows_by_tab_rows" ADD COLUMN "ram" varchar NOT NULL;
  ALTER TABLE "pages_blocks_pricing_rows_by_tab_rows" ADD COLUMN "disk" varchar NOT NULL;
  ALTER TABLE "pages_blocks_pricing_rows_by_tab_rows" ADD COLUMN "price" varchar NOT NULL;
  ALTER TABLE "pages_blocks_pricing" ADD COLUMN "heading" varchar NOT NULL;
  ALTER TABLE "pages_blocks_pricing" ADD COLUMN "subheading" varchar;
  ALTER TABLE "pages_blocks_pricing" ADD COLUMN "no_data_message" varchar;
  ALTER TABLE "pages_blocks_pricing" ADD COLUMN "payment_methods_label" varchar;
  ALTER TABLE "pages_blocks_faq_items" ADD COLUMN "question" varchar NOT NULL;
  ALTER TABLE "pages_blocks_faq_items" ADD COLUMN "answer" varchar NOT NULL;
  ALTER TABLE "pages_blocks_faq" ADD COLUMN "heading" varchar NOT NULL;
  ALTER TABLE "pages_blocks_consultation" ADD COLUMN "heading" varchar NOT NULL;
  ALTER TABLE "pages_blocks_consultation" ADD COLUMN "subheading" varchar;
  ALTER TABLE "pages_blocks_consultation" ADD COLUMN "cta_label" varchar;
  ALTER TABLE "pages_blocks_simple_content" ADD COLUMN "page_title" varchar;
  ALTER TABLE "pages_blocks_simple_content" ADD COLUMN "content" jsonb NOT NULL;
  ALTER TABLE "pages_blocks_documents_items" ADD COLUMN "title" varchar NOT NULL;
  ALTER TABLE "pages_blocks_documents" ADD COLUMN "heading" varchar NOT NULL;
  ALTER TABLE "pages_blocks_documents" ADD COLUMN "intro" varchar;
  ALTER TABLE "pages_blocks_documents" ADD COLUMN "view_link_label" varchar;
  ALTER TABLE "pages_blocks_documents" ADD COLUMN "download_link_label" varchar;
  ALTER TABLE "pages_blocks_architecture_checklist" ADD COLUMN "text" varchar NOT NULL;
  ALTER TABLE "pages_blocks_architecture" ADD COLUMN "heading" varchar NOT NULL;
  ALTER TABLE "pages_blocks_architecture" ADD COLUMN "subheading" varchar;
  ALTER TABLE "pages_blocks_architecture" ADD COLUMN "description" varchar;
  ALTER TABLE "pages_blocks_architecture" ADD COLUMN "checklist_label" varchar;
  ALTER TABLE "pages_blocks_vps_pricing_cards_plans_spec_bullets" ADD COLUMN "text" varchar NOT NULL;
  ALTER TABLE "pages_blocks_vps_pricing_cards_plans" ADD COLUMN "display_name" varchar NOT NULL;
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "service_pages_id";
  DROP TYPE "public"."enum_service_pages_blocks_hero_image_fit";
  DROP TYPE "public"."enum_service_pages_blocks_consultation_tone";
  DROP TYPE "public"."enum_service_pages_blocks_advantages_tone";
  DROP TYPE "public"."enum_service_pages_publication_status";`)
}
