import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "service_pages_blocks_vps_pricing_cards_locales" (
  	"eyebrow" varchar,
  	"heading" varchar NOT NULL,
  	"subheading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  ALTER TABLE "service_pages_blocks_vps_pricing_cards_locales" ADD CONSTRAINT "service_pages_blocks_vps_pricing_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."service_pages_blocks_vps_pricing_cards"("id") ON DELETE cascade ON UPDATE no action;
  CREATE UNIQUE INDEX "service_pages_blocks_vps_pricing_cards_locales_locale_parent" ON "service_pages_blocks_vps_pricing_cards_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "service_pages_blocks_vps_pricing_cards_locales" CASCADE;`)
}
