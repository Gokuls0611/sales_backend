DO $$ BEGIN
 CREATE TYPE "public"."role" AS ENUM('super-admin', 'admin', 'user');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" serial NOT NULL,
	"email" varchar NOT NULL,
	"phone" varchar NOT NULL,
	"role" "role" DEFAULT 'super-admin' NOT NULL,
	"username" varchar NOT NULL,
	"password" varchar NOT NULL,
	"active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
