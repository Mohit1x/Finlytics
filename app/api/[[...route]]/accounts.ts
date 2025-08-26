import { db } from "@/db/drizzle";
import { accounts } from "@/db/schema";

import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { eq } from "drizzle-orm";

const app = new Hono().get(
  "/",
  clerkMiddleware({
    publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
    secretKey: process.env.CLERK_SECRET_KEY,
  }),
  async (c) => {
    const auth = getAuth(c);

    if (!auth?.userId) {
      throw new HTTPException(401, {
        res: c.json({ error: "unauthorized" }, 401),
      });
    }

    const data = await db
      .select({
        id: accounts.id,
        name: accounts.name,
      })
      .from(accounts)
      .where(eq(accounts.id, auth.userId));

    return c.json({ data });
  }
);

export default app;
