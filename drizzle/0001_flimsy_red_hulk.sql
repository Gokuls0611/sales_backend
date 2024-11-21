CREATE TABLE IF NOT EXISTS "event" (
	"evt_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_by" varchar,
	"updated_by" varchar,
	"name" varchar(255) NOT NULL,
	"address" varchar(255) NOT NULL,
	"max_ppl" integer NOT NULL,
	"numb_of_sub_events" integer NOT NULL,
	"category_allowed" varchar(255),
	"from" timestamp with time zone NOT NULL,
	"to" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "user" ADD PRIMARY KEY ("id");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "event" ADD CONSTRAINT "event_created_by_user_email_fk" FOREIGN KEY ("created_by") REFERENCES "public"."user"("email") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "event" ADD CONSTRAINT "event_updated_by_user_email_fk" FOREIGN KEY ("updated_by") REFERENCES "public"."user"("email") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
