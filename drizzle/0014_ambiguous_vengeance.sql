ALTER TABLE "form_submissions" ALTER COLUMN "email" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "form_submissions" ALTER COLUMN "email" SET NOT NULL;