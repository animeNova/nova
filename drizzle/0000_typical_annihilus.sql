CREATE TABLE IF NOT EXISTS "account" (
	"id" text PRIMARY KEY DEFAULT 'TE6KgKQqWmruupSucFysl' NOT NULL,
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
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"age" date,
	"job" text NOT NULL,
	"image" text,
	"imageId" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "cast_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "charachter" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"image" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"showId" uuid,
	"castId" uuid,
	CONSTRAINT "charachter_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "collection" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
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
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"birth" date,
	"image" text,
	"imageId" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "creator_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "genre" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "genre_title_unique" UNIQUE("title")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "language" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "language_title_unique" UNIQUE("title")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "session" (
	"id" text PRIMARY KEY DEFAULT 'L1hFDm7J8BkwTEHGB03Gp' NOT NULL,
	"expiresAt" timestamp NOT NULL,
	"ipAddress" text,
	"userAgent" text,
	"userId" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "show" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"secondTilte" text,
	"tags" text[],
	"relativeTitle" text NOT NULL,
	"description" text NOT NULL,
	"status" text NOT NULL,
	"season" text NOT NULL,
	"type" text NOT NULL,
	"trailer" text,
	"rating" double precision NOT NULL,
	"image" text NOT NULL,
	"backgroundImage" text NOT NULL,
	"images" text[] DEFAULT '{}'::text[],
	"embedding" vector(1024),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"languageId" uuid,
	"creatorId" uuid,
	"studioId" uuid,
	"airing" date NOT NULL,
	"video" text DEFAULT '' NOT NULL,
	"videoKey" text DEFAULT '' NOT NULL,
	CONSTRAINT "show_title_unique" UNIQUE("title")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "show_casts" (
	"show_id" uuid NOT NULL,
	"cast_id" uuid NOT NULL,
	CONSTRAINT "show_casts_show_id_cast_id_pk" PRIMARY KEY("show_id","cast_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "show_to_collection" (
	"show_id" uuid NOT NULL,
	"collection_id" uuid NOT NULL,
	CONSTRAINT "show_to_collection_show_id_collection_id_pk" PRIMARY KEY("show_id","collection_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "show_genre" (
	"show_id" uuid NOT NULL,
	"genre_id" uuid NOT NULL,
	CONSTRAINT "show_genre_show_id_genre_id_pk" PRIMARY KEY("show_id","genre_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "studio" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"image" text,
	"imageId" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "studio_title_unique" UNIQUE("title")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" text PRIMARY KEY DEFAULT 'GNRqsNlSSBlJOPHqAw-oN' NOT NULL,
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
CREATE TABLE IF NOT EXISTS "user_interactions" (
	"user_id" text NOT NULL,
	"show_id" uuid NOT NULL,
	"interaction_type" text NOT NULL,
	"interaction_weight" integer DEFAULT 1,
	CONSTRAINT "user_interactions_user_id_show_id_pk" PRIMARY KEY("user_id","show_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_preferences" (
	"user_id" text,
	"genre_id" uuid,
	CONSTRAINT "user_preferences_user_id_genre_id_pk" PRIMARY KEY("user_id","genre_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "verification" (
	"id" text PRIMARY KEY DEFAULT '01MG1Nqoy8gx08iwk-Z0C' NOT NULL,
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
 ALTER TABLE "charachter" ADD CONSTRAINT "charachter_showId_show_id_fk" FOREIGN KEY ("showId") REFERENCES "public"."show"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "charachter" ADD CONSTRAINT "charachter_castId_cast_id_fk" FOREIGN KEY ("castId") REFERENCES "public"."cast"("id") ON DELETE cascade ON UPDATE no action;
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
 ALTER TABLE "show_to_collection" ADD CONSTRAINT "show_to_collection_show_id_show_id_fk" FOREIGN KEY ("show_id") REFERENCES "public"."show"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "show_to_collection" ADD CONSTRAINT "show_to_collection_collection_id_collection_id_fk" FOREIGN KEY ("collection_id") REFERENCES "public"."collection"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_interactions" ADD CONSTRAINT "user_interactions_show_id_show_id_fk" FOREIGN KEY ("show_id") REFERENCES "public"."show"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_preferences" ADD CONSTRAINT "user_preferences_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_preferences" ADD CONSTRAINT "user_preferences_genre_id_genre_id_fk" FOREIGN KEY ("genre_id") REFERENCES "public"."genre"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
