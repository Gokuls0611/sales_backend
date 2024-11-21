ALTER TABLE "products" ADD COLUMN "created_by" varchar;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "updated_by" varchar;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "products" ADD CONSTRAINT "products_created_by_user_email_fk" FOREIGN KEY ("created_by") REFERENCES "public"."user"("email") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "products" ADD CONSTRAINT "products_updated_by_user_email_fk" FOREIGN KEY ("updated_by") REFERENCES "public"."user"("email") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
