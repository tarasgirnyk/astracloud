import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_hero_image_fit" AS ENUM('cover', 'contain');
  CREATE TYPE "public"."enum_pages_blocks_advantages_tone" AS ENUM('dark', 'light');
  CREATE TYPE "public"."enum_pages_blocks_consultation_tone" AS ENUM('dark', 'light');
  CREATE TABLE "pages_blocks_architecture_checklist" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_architecture" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar NOT NULL,
  	"subheading" varchar,
  	"description" varchar,
  	"checklist_label" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_vps_pricing_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_hero" ADD COLUMN "tagline" varchar;
  ALTER TABLE "pages_blocks_hero" ADD COLUMN "image_src" varchar DEFAULT '/images/hero3.png';
  ALTER TABLE "pages_blocks_hero" ADD COLUMN "image_fit" "enum_pages_blocks_hero_image_fit" DEFAULT 'cover';
  ALTER TABLE "pages_blocks_advantages" ADD COLUMN "tone" "enum_pages_blocks_advantages_tone" DEFAULT 'dark';
  ALTER TABLE "pages_blocks_consultation" ADD COLUMN "tone" "enum_pages_blocks_consultation_tone" DEFAULT 'dark';
  ALTER TABLE "pages_blocks_architecture_checklist" ADD CONSTRAINT "pages_blocks_architecture_checklist_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_architecture"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_architecture" ADD CONSTRAINT "pages_blocks_architecture_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_vps_pricing_cards" ADD CONSTRAINT "pages_blocks_vps_pricing_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_architecture_checklist_order_idx" ON "pages_blocks_architecture_checklist" USING btree ("_order");
  CREATE INDEX "pages_blocks_architecture_checklist_parent_id_idx" ON "pages_blocks_architecture_checklist" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_architecture_order_idx" ON "pages_blocks_architecture" USING btree ("_order");
  CREATE INDEX "pages_blocks_architecture_parent_id_idx" ON "pages_blocks_architecture" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_architecture_path_idx" ON "pages_blocks_architecture" USING btree ("_path");
  CREATE INDEX "pages_blocks_vps_pricing_cards_order_idx" ON "pages_blocks_vps_pricing_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_vps_pricing_cards_parent_id_idx" ON "pages_blocks_vps_pricing_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_vps_pricing_cards_path_idx" ON "pages_blocks_vps_pricing_cards" USING btree ("_path");`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_architecture_checklist" CASCADE;
  DROP TABLE "pages_blocks_architecture" CASCADE;
  DROP TABLE "pages_blocks_vps_pricing_cards" CASCADE;
  ALTER TABLE "pages_blocks_hero" DROP COLUMN "tagline";
  ALTER TABLE "pages_blocks_hero" DROP COLUMN "image_src";
  ALTER TABLE "pages_blocks_hero" DROP COLUMN "image_fit";
  ALTER TABLE "pages_blocks_advantages" DROP COLUMN "tone";
  ALTER TABLE "pages_blocks_consultation" DROP COLUMN "tone";
  DROP TYPE "public"."enum_pages_blocks_hero_image_fit";
  DROP TYPE "public"."enum_pages_blocks_advantages_tone";
  DROP TYPE "public"."enum_pages_blocks_consultation_tone";`)
}
