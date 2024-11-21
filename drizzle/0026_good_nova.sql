DO $$ BEGIN
 CREATE TYPE "public"."asset_type" AS ENUM('certificate', 'badge');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "evt_assetes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"evt_id" uuid NOT NULL,
	"default" boolean DEFAULT false,
	"asset_type" "asset_type" NOT NULL,
	"image_path" varchar NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "evt_assetes" ADD CONSTRAINT "evt_assetes_evt_id_event_evt_id_fk" FOREIGN KEY ("evt_id") REFERENCES "public"."event"("evt_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
