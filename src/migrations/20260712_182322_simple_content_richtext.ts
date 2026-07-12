import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_simple_content_sections_paragraphs" CASCADE;
  DROP TABLE "pages_blocks_simple_content_sections_list_items" CASCADE;
  DROP TABLE "pages_blocks_simple_content_sections" CASCADE;
  DELETE FROM "pages_blocks_simple_content";
  ALTER TABLE "pages_blocks_simple_content" ADD COLUMN "content" jsonb NOT NULL;`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_blocks_simple_content_sections_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_simple_content_sections_list_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_simple_content_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar
  );
  
  ALTER TABLE "pages_blocks_simple_content_sections_paragraphs" ADD CONSTRAINT "pages_blocks_simple_content_sections_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_simple_content_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_simple_content_sections_list_items" ADD CONSTRAINT "pages_blocks_simple_content_sections_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_simple_content_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_simple_content_sections" ADD CONSTRAINT "pages_blocks_simple_content_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_simple_content"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_simple_content_sections_paragraphs_order_idx" ON "pages_blocks_simple_content_sections_paragraphs" USING btree ("_order");
  CREATE INDEX "pages_blocks_simple_content_sections_paragraphs_parent_id_idx" ON "pages_blocks_simple_content_sections_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_simple_content_sections_list_items_order_idx" ON "pages_blocks_simple_content_sections_list_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_simple_content_sections_list_items_parent_id_idx" ON "pages_blocks_simple_content_sections_list_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_simple_content_sections_order_idx" ON "pages_blocks_simple_content_sections" USING btree ("_order");
  CREATE INDEX "pages_blocks_simple_content_sections_parent_id_idx" ON "pages_blocks_simple_content_sections" USING btree ("_parent_id");
  ALTER TABLE "pages_blocks_simple_content" DROP COLUMN "content";`)
}
