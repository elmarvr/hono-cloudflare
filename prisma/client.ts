import { PrismaClient } from "@prisma/client/edge";
import type { Env } from "../src/index";

export let prisma: PrismaClient;

export function initPrisma(env: Env) {
  if (!prisma) {
    prisma = new PrismaClient({
      datasources: {
        db: {
          url: env.DATABASE_URL,
        },
      },
    });
  }

  return prisma;
}
