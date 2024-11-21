ALTER TABLE "forms" ALTER COLUMN "sub_events" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "forms" ALTER COLUMN "sub_events" SET NOT NULL;