CREATE TABLE IF NOT EXISTS "account" (
	"id" uuid PRIMARY KEY DEFAULT 'gen_random_uuid()' NOT NULL,
	"accountId" text NOT NULL,
	"providerId" text NOT NULL,
	"userId" text NOT NULL,
	"accessToken" text,
	"refreshToken" text,
	"idToken" text,
	"expiresAt" timestamp,
	"password" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "cast" (
	"id" uuid PRIMARY KEY DEFAULT 'gen_random_uuid()' NOT NULL,
	"name" text NOT NULL,
	"age" integer NOT NULL,
	"job" text NOT NULL,
	"image" text,
	"imageId" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "cast_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "charachter" (
	"id" uuid PRIMARY KEY DEFAULT 'gen_random_uuid()' NOT NULL,
	"name" text NOT NULL,
	"image" text,
	"imageId" text,
	"createdAt" timestamp NOT NULL,
	"updatedAt" timestamp NOT NULL,
	"showId" text,
	CONSTRAINT "charachter_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "collection" (
	"id" uuid PRIMARY KEY DEFAULT 'gen_random_uuid()' NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"private" boolean DEFAULT false,
	"image" text,
	"imageId" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"userId" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "creator" (
	"id" uuid PRIMARY KEY DEFAULT 'gen_random_uuid()' NOT NULL,
	"name" text NOT NULL,
	"age" integer NOT NULL,
	"image" text,
	"imageId" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "creator_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "genre" (
	"id" uuid PRIMARY KEY DEFAULT 'gen_random_uuid()' NOT NULL,
	"title" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "genre_title_unique" UNIQUE("title")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "language" (
	"id" uuid PRIMARY KEY DEFAULT 'gen_random_uuid()' NOT NULL,
	"title" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "language_title_unique" UNIQUE("title")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "session" (
	"id" uuid PRIMARY KEY DEFAULT 'gen_random_uuid()' NOT NULL,
	"expiresAt" timestamp NOT NULL,
	"ipAddress" text,
	"userAgent" text,
	"userId" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "show" (
	"id" uuid PRIMARY KEY DEFAULT 'gen_random_uuid()' NOT NULL,
	"title" text NOT NULL,
	"relativeTitle" text NOT NULL,
	"description" text NOT NULL,
	"status" text NOT NULL,
	"season" text NOT NULL,
	"trailer" text,
	"rating" integer NOT NULL,
	"age" integer NOT NULL,
	"job" text NOT NULL,
	"image" text,
	"imageId" text,
	"backgroundImage" text,
	"backgroundImageId" text,
	"embedding" vector(1024),
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"languageId" text,
	"creatorId" text,
	"studioId" text,
	CONSTRAINT "show_title_unique" UNIQUE("title")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "show_to_cast" (
	"show_id" text NOT NULL,
	"cast_id" text NOT NULL,
	CONSTRAINT "show_to_cast_show_id_cast_id_pk" PRIMARY KEY("show_id","cast_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "show_to_collection" (
	"show_id" text NOT NULL,
	"collection_id" text NOT NULL,
	CONSTRAINT "show_to_collection_show_id_collection_id_pk" PRIMARY KEY("show_id","collection_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "show_to_genre" (
	"show_id" text NOT NULL,
	"genre_id" text NOT NULL,
	CONSTRAINT "show_to_genre_show_id_genre_id_pk" PRIMARY KEY("show_id","genre_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "studio" (
	"id" uuid PRIMARY KEY DEFAULT 'gen_random_uuid()' NOT NULL,
	"title" text NOT NULL,
	"image" text,
	"imageId" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "studio_title_unique" UNIQUE("title")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" uuid PRIMARY KEY DEFAULT 'gen_random_uuid()' NOT NULL,
	"name" text NOT NULL,
	"password" text,
	"email" text NOT NULL,
	"emailVerified" boolean NOT NULL,
	"image" text,
	"role" text DEFAULT 'user',
	"banned" boolean DEFAULT false,
	"banReason" text,
	"banExpires" integer,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "verification" (
	"id" uuid PRIMARY KEY DEFAULT 'gen_random_uuid()' NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expiresAt" timestamp NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "account" ADD CONSTRAINT "account_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session" ADD CONSTRAINT "session_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "show_to_cast" ADD CONSTRAINT "show_to_cast_show_id_show_id_fk" FOREIGN KEY ("show_id") REFERENCES "public"."show"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "show_to_cast" ADD CONSTRAINT "show_to_cast_cast_id_cast_id_fk" FOREIGN KEY ("cast_id") REFERENCES "public"."cast"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "show_to_collection" ADD CONSTRAINT "show_to_collection_show_id_show_id_fk" FOREIGN KEY ("show_id") REFERENCES "public"."show"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "show_to_collection" ADD CONSTRAINT "show_to_collection_collection_id_collection_id_fk" FOREIGN KEY ("collection_id") REFERENCES "public"."collection"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "show_to_genre" ADD CONSTRAINT "show_to_genre_show_id_show_id_fk" FOREIGN KEY ("show_id") REFERENCES "public"."show"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "show_to_genre" ADD CONSTRAINT "show_to_genre_genre_id_genre_id_fk" FOREIGN KEY ("genre_id") REFERENCES "public"."genre"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
