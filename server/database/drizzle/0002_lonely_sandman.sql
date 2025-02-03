CREATE TABLE "points-project"."admin" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "points-project"."admin_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"email" varchar(255) NOT NULL,
	"password_hash" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT TIMEZONE('America/New_York', NOW()) NOT NULL,
	CONSTRAINT "admin_email_unique" UNIQUE("email")
);
