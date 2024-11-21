ALTER TABLE "product_sales" ALTER COLUMN "quantity" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "product_sales" ALTER COLUMN "quantity" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "product_sales" ALTER COLUMN "quantity" DROP NOT NULL;