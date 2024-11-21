ALTER TABLE "user_category" RENAME COLUMN "category_id" TO "category";--> statement-breakpoint
ALTER TABLE "user_category" DROP CONSTRAINT "user_category_category_id_user_id_unique";--> statement-breakpoint
ALTER TABLE "user_category" DROP CONSTRAINT "user_category_category_id_categories_id_fk";
--> statement-breakpoint
ALTER TABLE "user_category" ALTER COLUMN "category" SET DATA TYPE varchar;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_category" ADD CONSTRAINT "user_category_category_categories_name_fk" FOREIGN KEY ("category") REFERENCES "public"."categories"("name") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "user_category" ADD CONSTRAINT "user_category_category_user_id_unique" UNIQUE("category","user_id");