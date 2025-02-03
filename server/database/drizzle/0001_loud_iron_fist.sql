CREATE TABLE "points-project"."points" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "points-project"."points_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"user" integer NOT NULL,
	"amount" integer DEFAULT 0 NOT NULL,
	"added_at" timestamp DEFAULT TIMEZONE('America/New_York', NOW()) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "points-project"."points" ADD CONSTRAINT "points_user_users_id_fk" FOREIGN KEY ("user") REFERENCES "points-project"."users"("id") ON DELETE no action ON UPDATE no action;