import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

// Hand-written per README's documented migrate:create gotcha — see
// specs/002-seo-foundations/tasks.md T006. The auto-generated version of
// this migration also tried to re-create the `pages_blocks_steps*` tables
// (already applied in migration 20260724_142826_steps_block) because
// src/migrations/index.ts listed that migration before
// 20260724_153900_faq_items_pages_relationship, even though it actually ran
// after it (batch 17 vs 16) — its own snapshot was the correct, complete
// baseline, but `migrate:create` was diffing against the older one instead.
// Fixed by reordering index.ts; this migration's SQL below is only the
// `meta.title`/`meta.description`/`meta.ogImage` fields added to `Pages`
// and `ServicePages` (data-model.md).
export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_locales" (
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );

  CREATE TABLE "service_pages_locales" (
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );

  ALTER TABLE "pages" ADD COLUMN "meta_og_image" varchar;
  ALTER TABLE "service_pages" ADD COLUMN "meta_og_image" varchar;
  ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "service_pages_locales" ADD CONSTRAINT "service_pages_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."service_pages"("id") ON DELETE cascade ON UPDATE no action;
  CREATE UNIQUE INDEX "pages_locales_locale_parent_id_unique" ON "pages_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "service_pages_locales_locale_parent_id_unique" ON "service_pages_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_locales" CASCADE;
  DROP TABLE "service_pages_locales" CASCADE;
  ALTER TABLE "pages" DROP COLUMN "meta_og_image";
  ALTER TABLE "service_pages" DROP COLUMN "meta_og_image";`)
}
