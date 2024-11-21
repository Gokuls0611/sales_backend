ALTER TABLE "forms" ADD COLUMN "sub_events" json DEFAULT '["b066f5aa-a722-4a3a-8f9c-e8feeed83be6"]'::json;--> statement-breakpoint
ALTER TABLE "sub_event" DROP COLUMN IF EXISTS "sub_events";