import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_blocks_services_payment_methods" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL
  );
  
  ALTER TABLE "pages_blocks_services_locales" ADD COLUMN "payment_methods_label" varchar;
  ALTER TABLE "pages_blocks_services_payment_methods" ADD CONSTRAINT "pages_blocks_services_payment_methods_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_services"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_services_payment_methods_order_idx" ON "pages_blocks_services_payment_methods" USING btree ("_order");
  CREATE INDEX "pages_blocks_services_payment_methods_parent_id_idx" ON "pages_blocks_services_payment_methods" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_services_payment_methods" CASCADE;
  ALTER TABLE "pages_blocks_services_locales" DROP COLUMN "payment_methods_label";`)
}
