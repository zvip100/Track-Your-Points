CREATE SCHEMA "points-project";
--> statement-breakpoint
CREATE TYPE "public"."booking_status" AS ENUM('P', 'C', 'R');--> statement-breakpoint
CREATE TABLE "points-project"."OTP" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "points-project"."OTP_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"user" integer NOT NULL,
	"OTP" varchar(6) NOT NULL,
	"created_at" timestamp DEFAULT TIMEZONE('America/New_York', NOW()) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "points-project"."admin" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "points-project"."admin_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"email" varchar(255) NOT NULL,
	"password_hash" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT TIMEZONE('America/New_York', NOW()) NOT NULL,
	CONSTRAINT "admin_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "points-project"."bookings" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "points-project"."bookings_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"user" integer NOT NULL,
	"checkIn" varchar(20) NOT NULL,
	"checkOut" varchar(20) NOT NULL,
	"booking_status" "booking_status" DEFAULT 'P' NOT NULL,
	"created_at" timestamp DEFAULT TIMEZONE('America/New_York', NOW()) NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "points-project"."points" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "points-project"."points_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"user" integer NOT NULL,
	"amount" integer DEFAULT 0 NOT NULL,
	"added_at" timestamp DEFAULT TIMEZONE('America/New_York', NOW()) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "points-project"."users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "points-project"."users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"first_name" varchar(255) NOT NULL,
	"last_name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password_hash" varchar(255),
	"phone" varchar(20),
	"registered" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT TIMEZONE('America/New_York', NOW()) NOT NULL,
	"updated_at" timestamp,
	"last_login" timestamp,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "points-project"."OTP" ADD CONSTRAINT "OTP_user_users_id_fk" FOREIGN KEY ("user") REFERENCES "points-project"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "points-project"."bookings" ADD CONSTRAINT "bookings_user_users_id_fk" FOREIGN KEY ("user") REFERENCES "points-project"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "points-project"."points" ADD CONSTRAINT "points_user_users_id_fk" FOREIGN KEY ("user") REFERENCES "points-project"."users"("id") ON DELETE no action ON UPDATE no action;