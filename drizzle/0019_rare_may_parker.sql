CREATE TABLE IF NOT EXISTS "user_category" (
	"user_id" uuid,
	"category_id" uuid,
	"ts" timestamp DEFAULT now(),
	CONSTRAINT "user_category_category_id_user_id_unique" UNIQUE("category_id","user_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_category" ADD CONSTRAINT "user_category_user_id_form_submissions_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."form_submissions"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_category" ADD CONSTRAINT "user_category_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
