ALTER TABLE "account" ALTER COLUMN "id" SET DEFAULT 'X9GCKLTPzLYZcVvI5QNjX';--> statement-breakpoint
ALTER TABLE "session" ALTER COLUMN "id" SET DEFAULT '_lrX5CiWshQWtHi2u-G2B';--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "id" SET DEFAULT '7QpWeDQGFZTNdDKoPl7nf';--> statement-breakpoint
ALTER TABLE "verification" ALTER COLUMN "id" SET DEFAULT 'SseF2R6z5VX5z6BJ-qsb8';--> statement-breakpoint
ALTER TABLE "cast" DROP COLUMN IF EXISTS "imageId";--> statement-breakpoint
ALTER TABLE "collection" DROP COLUMN IF EXISTS "imageId";--> statement-breakpoint
ALTER TABLE "creator" DROP COLUMN IF EXISTS "imageId";--> statement-breakpoint
ALTER TABLE "studio" DROP COLUMN IF EXISTS "imageId";