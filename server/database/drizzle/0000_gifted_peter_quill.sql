CREATE SCHEMA "points-project";
--> statement-breakpoint
CREATE TABLE "points-project"."users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "points-project"."users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"first_name" varchar(255) NOT NULL,
	"last_name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password_hash" varchar(255),
	"phone" varchar(20),
	"points" integer DEFAULT 0,
	"registered" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp,
	"last_login" timestamp,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
