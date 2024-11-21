ALTER TABLE "evt_assetes" ALTER COLUMN "category_allowed" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "evt_assetes" ALTER COLUMN "category_allowed" SET NOT NULL;