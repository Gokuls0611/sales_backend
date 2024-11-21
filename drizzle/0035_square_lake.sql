DO $$ BEGIN
 CREATE TYPE "public"."role" AS ENUM('admin', 'master', 'user');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
