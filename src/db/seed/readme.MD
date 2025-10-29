# Database Setup & Seeding Guide

This guide explains how to seed the database and configure your local environment for development.

---

## 🧰 Prerequisites

Make sure you have the following installed:
- **Bun** (for running Drizzle commands)
- **PostgreSQL** (or the database you’re using)
- A running **local development server** (e.g., `localhost:3000`)

---

## ⚙️ Step 1: Start Your Local Server

Ensure your application’s local server is running.
This is required to connect to your local database instance.

```bash
bun dev
```

---

## 👤 Step 2: Create a User (If One Doesn’t Exist)

If your database doesn’t already contain a user, create one through your application’s sign-up flow or manually via SQL.
This user will be referenced in your `.env` file later.

---

## 🧑‍💻 Step 3: Open Drizzle Studio

Use Drizzle Kit to inspect your database and retrieve the user’s `id`.

```bash
bunx drizzle-kit studio
```

This will open **Drizzle Studio** in your browser.
Navigate to the **DB Terminal** tab.

---

## 🔍 Step 4: Get the User ID

In the DB terminal, run:

```sql
SELECT id, email FROM users;
```

Copy the `id` of the user you just created.

---

## 🔑 Step 5: Add User ID to `.env`

Open your `.env` file and add (or update) the following line:

```bash
SEED_USER_ID=<paste_user_id_here>
```

Save the file.

---

## 🌱 Step 6: Seed the Database

Now that your `.env` file is configured, you can run the seed script:

```bash
bun seed
```

This will populate your database with the necessary starter data.

---

## ✅ Done!

Your local database is now seeded and ready to use.

If you run into connection issues, double-check:
- Your local server is running.
- `.env` file contains the correct `DATABASE_URL` and `USER_ID`.
- You’re using the correct Drizzle config file.
