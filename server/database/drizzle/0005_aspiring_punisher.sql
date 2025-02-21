CREATE TABLE "points-project"."bookings" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "points-project"."bookings_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"user" integer NOT NULL,
	"checkIn" varchar(20),
	"checkOut" varchar(20),
	"confirmed" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT TIMEZONE('America/New_York', NOW()) NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "points-project"."bookings" ADD CONSTRAINT "bookings_user_users_id_fk" FOREIGN KEY ("user") REFERENCES "points-project"."users"("id") ON DELETE no action ON UPDATE no action;