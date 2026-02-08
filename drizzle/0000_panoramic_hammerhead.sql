CREATE TABLE "media_directories" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"path" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "media" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"path" varchar NOT NULL,
	"media_directory_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"first_name" varchar(50) NOT NULL,
	"last_name" varchar(50) NOT NULL,
	"email" varchar(50) NOT NULL,
	"password" text NOT NULL,
	"reset_password_token" text,
	"reset_password_expires" timestamp,
	"status" boolean DEFAULT true NOT NULL,
	"invalid_login_attempts" integer DEFAULT 0 NOT NULL,
	"last_password_changed_on" timestamp,
	"ip_address" varchar(45),
	"last_login" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "media" ADD CONSTRAINT "media_media_directory_id_media_directories_id_fk" FOREIGN KEY ("media_directory_id") REFERENCES "public"."media_directories"("id") ON DELETE no action ON UPDATE no action;