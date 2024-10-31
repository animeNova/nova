ALTER TABLE "charachter" ALTER COLUMN "createdAt" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "charachter" ALTER COLUMN "updatedAt" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "charachter" DROP COLUMN IF EXISTS "imageId";