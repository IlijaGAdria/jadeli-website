import { PrismaClient } from "@prisma/client";

declare global {
  var __caseCouturePrisma__: PrismaClient | undefined;
}

export const prisma =
  globalThis.__caseCouturePrisma__ ??
  new PrismaClient({
    log: ["warn", "error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalThis.__caseCouturePrisma__ = prisma;
}
