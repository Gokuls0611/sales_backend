ALTER TABLE "form_submissions" ALTER COLUMN "form_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "forms" ALTER COLUMN "from" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "forms" ALTER COLUMN "to" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "forms" ALTER COLUMN "category_allowed" DROP NOT NULL;