import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_advantages_accent" AS ENUM('orange', 'cyan', 'violet');
  CREATE TYPE "public"."enum_service_pages_blocks_advantages_accent" AS ENUM('orange', 'cyan', 'violet');
  CREATE TABLE "pages_blocks_advantages_stats_bar" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_advantages_stats_bar_locales" (
  	"value" varchar NOT NULL,
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "service_pages_blocks_advantages_stats_bar" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "service_pages_blocks_advantages_stats_bar_locales" (
  	"value" varchar NOT NULL,
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  ALTER TABLE "pages_blocks_advantages" ADD COLUMN "centered" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_advantages" ADD COLUMN "accent" "enum_pages_blocks_advantages_accent" DEFAULT 'orange';
  ALTER TABLE "service_pages_blocks_advantages" ADD COLUMN "centered" boolean DEFAULT false;
  ALTER TABLE "service_pages_blocks_advantages" ADD COLUMN "accent" "enum_service_pages_blocks_advantages_accent" DEFAULT 'orange';
  ALTER TABLE "pages_blocks_advantages_stats_bar" ADD CONSTRAINT "pages_blocks_advantages_stats_bar_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_advantages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_advantages_stats_bar_locales" ADD CONSTRAINT "pages_blocks_advantages_stats_bar_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_advantages_stats_bar"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "service_pages_blocks_advantages_stats_bar" ADD CONSTRAINT "service_pages_blocks_advantages_stats_bar_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."service_pages_blocks_advantages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "service_pages_blocks_advantages_stats_bar_locales" ADD CONSTRAINT "service_pages_blocks_advantages_stats_bar_locales_parent__fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."service_pages_blocks_advantages_stats_bar"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_advantages_stats_bar_order_idx" ON "pages_blocks_advantages_stats_bar" USING btree ("_order");
  CREATE INDEX "pages_blocks_advantages_stats_bar_parent_id_idx" ON "pages_blocks_advantages_stats_bar" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_advantages_stats_bar_locales_locale_parent_id_u" ON "pages_blocks_advantages_stats_bar_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "service_pages_blocks_advantages_stats_bar_order_idx" ON "service_pages_blocks_advantages_stats_bar" USING btree ("_order");
  CREATE INDEX "service_pages_blocks_advantages_stats_bar_parent_id_idx" ON "service_pages_blocks_advantages_stats_bar" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "service_pages_blocks_advantages_stats_bar_locales_locale_par" ON "service_pages_blocks_advantages_stats_bar_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_advantages_stats_bar" CASCADE;
  DROP TABLE "pages_blocks_advantages_stats_bar_locales" CASCADE;
  DROP TABLE "service_pages_blocks_advantages_stats_bar" CASCADE;
  DROP TABLE "service_pages_blocks_advantages_stats_bar_locales" CASCADE;
  ALTER TABLE "pages_blocks_advantages" DROP COLUMN "centered";
  ALTER TABLE "pages_blocks_advantages" DROP COLUMN "accent";
  ALTER TABLE "service_pages_blocks_advantages" DROP COLUMN "centered";
  ALTER TABLE "service_pages_blocks_advantages" DROP COLUMN "accent";
  DROP TYPE "public"."enum_pages_blocks_advantages_accent";
  DROP TYPE "public"."enum_service_pages_blocks_advantages_accent";`)
}
