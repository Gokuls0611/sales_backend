DROP TABLE "categories";--> statement-breakpoint
DROP TABLE "event";--> statement-breakpoint
DROP TABLE "evt_assetes";--> statement-breakpoint
DROP TABLE "fields";--> statement-breakpoint
DROP TABLE "form_submissions";--> statement-breakpoint
DROP TABLE "forms";--> statement-breakpoint
DROP TABLE "sub_event";--> statement-breakpoint
DROP TABLE "submission_fields";--> statement-breakpoint
DROP TABLE "user_category";--> statement-breakpoint
DROP TABLE "user_sub_event";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "role";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "active";