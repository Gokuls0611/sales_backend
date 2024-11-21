CREATE TABLE IF NOT EXISTS "join_sub_evt" (
	"sub_evt_id" uuid,
	"user_id" uuid,
	"ts" timestamp DEFAULT now(),
	CONSTRAINT "join_sub_evt_sub_evt_id_user_id_unique" UNIQUE("sub_evt_id","user_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "join_sub_evt" ADD CONSTRAINT "join_sub_evt_sub_evt_id_sub_event_sub_evt_id_fk" FOREIGN KEY ("sub_evt_id") REFERENCES "public"."sub_event"("sub_evt_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "join_sub_evt" ADD CONSTRAINT "join_sub_evt_user_id_form_submissions_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."form_submissions"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
