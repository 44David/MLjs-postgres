CREATE TABLE IF NOT EXISTS "Users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"username" text NOT NULL,
	"open-chats" text[],
	"installed-models" text[],
	"createdAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "Users_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "model" (
	"id" serial PRIMARY KEY NOT NULL,
	"model_name" text NOT NULL,
	"size" text NOT NULL,
	"context_length" text NOT NULL,
	"variations" text NOT NULL,
	"data_type" text NOT NULL,
	"hosted_where" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
