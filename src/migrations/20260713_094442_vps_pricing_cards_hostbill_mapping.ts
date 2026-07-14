import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_blocks_vps_pricing_cards_plans_spec_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_vps_pricing_cards_plans" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"hostbill_product_id" varchar NOT NULL,
  	"display_name" varchar NOT NULL
  );
  
  ALTER TABLE "pages_blocks_vps_pricing_cards" ADD COLUMN "hostbill_category_id" varchar NOT NULL DEFAULT '';
  ALTER TABLE "pages_blocks_vps_pricing_cards_plans_spec_bullets" ADD CONSTRAINT "pages_blocks_vps_pricing_cards_plans_spec_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_vps_pricing_cards_plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_vps_pricing_cards_plans" ADD CONSTRAINT "pages_blocks_vps_pricing_cards_plans_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_vps_pricing_cards"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_vps_pricing_cards_plans_spec_bullets_order_idx" ON "pages_blocks_vps_pricing_cards_plans_spec_bullets" USING btree ("_order");
  CREATE INDEX "pages_blocks_vps_pricing_cards_plans_spec_bullets_parent_id_idx" ON "pages_blocks_vps_pricing_cards_plans_spec_bullets" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_vps_pricing_cards_plans_order_idx" ON "pages_blocks_vps_pricing_cards_plans" USING btree ("_order");
  CREATE INDEX "pages_blocks_vps_pricing_cards_plans_parent_id_idx" ON "pages_blocks_vps_pricing_cards_plans" USING btree ("_parent_id");`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_vps_pricing_cards_plans_spec_bullets" CASCADE;
  DROP TABLE "pages_blocks_vps_pricing_cards_plans" CASCADE;
  ALTER TABLE "pages_blocks_vps_pricing_cards" DROP COLUMN "hostbill_category_id";`)
}
