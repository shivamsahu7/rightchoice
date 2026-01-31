CREATE TABLE "media_directories" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"path" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "media" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"path" text NOT NULL,
	"media_directory_id" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "media" ADD CONSTRAINT "media_media_directory_id_media_directories_id_fk" FOREIGN KEY ("media_directory_id") REFERENCES "public"."media_directories"("id") ON DELETE no action ON UPDATE no action;