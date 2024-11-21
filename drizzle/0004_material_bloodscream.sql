CREATE TABLE IF NOT EXISTS "form_response" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" serial NOT NULL,
	"form_id" uuid,
	"json_v" jsonb,
	CONSTRAINT "form_response_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
ALTER TABLE "forms" ALTER COLUMN "evt_id" SET NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "form_response" ADD CONSTRAINT "form_response_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
