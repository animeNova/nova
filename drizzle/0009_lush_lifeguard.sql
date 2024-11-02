DO $$ BEGIN
 ALTER TABLE "charachter" ADD CONSTRAINT "charachter_showId_show_id_fk" FOREIGN KEY ("showId") REFERENCES "public"."show"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
