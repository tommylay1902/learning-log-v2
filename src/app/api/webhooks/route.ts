import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest } from "next/server";
import { db } from "@/db";
import { NewUser, usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req, {
      signingSecret: process.env.CLERK_WEBHOOK_SIGNING_SECRET,
    });
    const { id } = evt.data;
    const eventType = evt.type;
    console.log(
      `Received webhook with ID ${id} and event type of ${eventType}`,
    );

    switch (eventType) {
      case "user.created":
        await db.insert(usersTable).values({
          clerkId: evt.data.id,
          firstName: evt.data.first_name,
          lastName: evt.data.last_name,
          emailAddress: evt.data.email_addresses[0].email_address,
          imageUrl: evt.data.image_url,
        } as NewUser);
        break;
      case "user.deleted":
        const clerkId = evt.data.id;
        if (!clerkId) return new Response("Bad request", { status: 400 });
        await db.delete(usersTable).where(eq(usersTable.clerkId, clerkId));
        break;
      case "user.updated":
        return new Response("Not Implemented yet", { status: 400 });
        break;
    }

    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }
}
