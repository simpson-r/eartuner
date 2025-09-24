import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

const prisma = new PrismaClient().$extends(withAccelerate());
export type DB = typeof prisma;

declare global {
  var db: DB | undefined;
}

const db: DB = globalThis.db ?? prisma;

if (process.env.NODE_ENV !== "production") {
  globalThis.db = db;
}

export default db;
