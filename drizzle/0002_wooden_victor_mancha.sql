ALTER TABLE "cast" RENAME COLUMN "age" TO "birth";--> statement-breakpoint
ALTER TABLE "account" ALTER COLUMN "id" SET DEFAULT '0NaqnXqF7QpsM6YqkawId';--> statement-breakpoint
ALTER TABLE "cast" ALTER COLUMN "birth" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "creator" ALTER COLUMN "birth" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "session" ALTER COLUMN "id" SET DEFAULT 'xQl-ku3zqDni5oT7n-EHv';--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "id" SET DEFAULT '0RjglxBKC-cjRILlef2Td';--> statement-breakpoint
ALTER TABLE "verification" ALTER COLUMN "id" SET DEFAULT 'dBTsgh1xnPuy1vElR6Y__';