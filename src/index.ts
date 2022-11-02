import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { initPrisma } from "../prisma/client";
import { task } from "./task";

export interface Env {
  DATABASE_URL: string;
  // Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
  // MY_KV_NAMESPACE: KVNamespace;
  //
  // Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
  // MY_DURABLE_OBJECT: DurableObjectNamespace;
  //
  // Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
  // MY_BUCKET: R2Bucket;
}

const app = new Hono<{ Bindings: Env }>();

app.route("/task", task);

export default {
  fetch(request: Request, env: Env, ctx: ExecutionContext) {
    initPrisma(env);

    return app.fetch(request, env, ctx);
  },
};
