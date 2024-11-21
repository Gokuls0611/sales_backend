ALTER TABLE "join_sub_evt" RENAME TO "user_sub_event";--> statement-breakpoint
ALTER TABLE "user_sub_event" DROP CONSTRAINT "join_sub_evt_sub_evt_id_user_id_unique";--> statement-breakpoint
ALTER TABLE "user_sub_event" DROP CONSTRAINT "join_sub_evt_sub_evt_id_sub_event_sub_evt_id_fk";
--> statement-breakpoint
ALTER TABLE "user_sub_event" DROP CONSTRAINT "join_sub_evt_user_id_form_submissions_id_fk";
--> statement-breakpoint
ALTER TABLE "user_sub_event" ADD COLUMN "attended" boolean DEFAULT false;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_sub_event" ADD CONSTRAINT "user_sub_event_sub_evt_id_sub_event_sub_evt_id_fk" FOREIGN KEY ("sub_evt_id") REFERENCES "public"."sub_event"("sub_evt_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_sub_event" ADD CONSTRAINT "user_sub_event_user_id_form_submissions_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."form_submissions"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "user_sub_event" ADD CONSTRAINT "user_sub_event_sub_evt_id_user_id_unique" UNIQUE("sub_evt_id","user_id");