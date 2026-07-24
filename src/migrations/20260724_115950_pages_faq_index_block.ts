import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_faq_categories" AS ENUM('company', 'vps', 'dedicated');
  CREATE TYPE "public"."enum_service_pages_blocks_faq_categories" AS ENUM('company', 'vps', 'dedicated');
  CREATE TABLE "pages_blocks_faq_categories" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_pages_blocks_faq_categories",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_faq_index" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_faq_index_locales" (
  	"heading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "service_pages_blocks_faq_categories" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_service_pages_blocks_faq_categories",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  ALTER TABLE "pages_blocks_faq_categories" ADD CONSTRAINT "pages_blocks_faq_categories_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_index" ADD CONSTRAINT "pages_blocks_faq_index_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_index_locales" ADD CONSTRAINT "pages_blocks_faq_index_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq_index"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "service_pages_blocks_faq_categories" ADD CONSTRAINT "service_pages_blocks_faq_categories_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."service_pages_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_faq_categories_order_idx" ON "pages_blocks_faq_categories" USING btree ("order");
  CREATE INDEX "pages_blocks_faq_categories_parent_idx" ON "pages_blocks_faq_categories" USING btree ("parent_id");
  CREATE INDEX "pages_blocks_faq_index_order_idx" ON "pages_blocks_faq_index" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_index_parent_id_idx" ON "pages_blocks_faq_index" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_index_path_idx" ON "pages_blocks_faq_index" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_faq_index_locales_locale_parent_id_unique" ON "pages_blocks_faq_index_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "service_pages_blocks_faq_categories_order_idx" ON "service_pages_blocks_faq_categories" USING btree ("order");
  CREATE INDEX "service_pages_blocks_faq_categories_parent_idx" ON "service_pages_blocks_faq_categories" USING btree ("parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_faq_categories" CASCADE;
  DROP TABLE "pages_blocks_faq_index" CASCADE;
  DROP TABLE "pages_blocks_faq_index_locales" CASCADE;
  DROP TABLE "service_pages_blocks_faq_categories" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_faq_categories";
  DROP TYPE "public"."enum_service_pages_blocks_faq_categories";`)
}
