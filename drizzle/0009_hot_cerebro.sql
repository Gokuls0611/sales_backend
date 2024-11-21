ALTER TABLE "form_submissions" ADD COLUMN "name" varchar DEFAULT 'unnamed' NOT NULL;--> statement-breakpoint
ALTER TABLE "form_submissions" ADD COLUMN "phone" varchar DEFAULT '0000000000' NOT NULL;--> statement-breakpoint
ALTER TABLE "submission_fields" DROP COLUMN IF EXISTS "name";--> statement-breakpoint
ALTER TABLE "submission_fields" DROP COLUMN IF EXISTS "phone";