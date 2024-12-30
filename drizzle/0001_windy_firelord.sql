ALTER TABLE "account" ALTER COLUMN "id" SET DEFAULT 'ScNSO81sNx2G3CpWmeVKd';--> statement-breakpoint
ALTER TABLE "session" ALTER COLUMN "id" SET DEFAULT 'v6DN5vJayhMasQghhGPHf';--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "id" SET DEFAULT '7BgUZa9WLvk6RbFNVd3Ps';--> statement-breakpoint
ALTER TABLE "verification" ALTER COLUMN "id" SET DEFAULT '1X-l72mIcJBnwclR2lOWW';--> statement-breakpoint
ALTER TABLE "show" DROP COLUMN IF EXISTS "backgroundImage";--> statement-breakpoint
ALTER TABLE "show" DROP COLUMN IF EXISTS "images";