import { Hono } from "hono";
import { validator } from "hono/validator";
import { Env } from "./index";
import { prisma } from "../prisma/client";
import type { Task } from "@prisma/client";

export const task = new Hono<{ Bindings: Env }>()
  .get("/", async (c) => {
    const tasks = await prisma.task.findMany();

    return c.json({
      tasks,
    });
  })

  .get("/:id", async (c) => {
    const id = +c.req.param("id");

    const task = await prisma.task.findUnique({
      where: { id },
    });

    return c.json(task);
  })

  .post(
    "/",
    validator((v) => ({
      title: v.json("title").isRequired(),
      description: v.json("description").isRequired(),
    })),
    async (c) => {
      const data = c.req.valid();

      const task = await prisma.task.create({
        data,
      });

      return c.json(task);
    }
  )

  .put(
    "/:id",
    validator((v) => ({
      title: v.json("title").isOptional(),
      description: v.json("description").isOptional(),
    })),
    async (c) => {
      const id = +c.req.param("id");
      const data = c.req.valid() as Partial<Pick<Task, "title" | "description">>;

      const task = await prisma.task.update({
        where: {
          id,
        },
        data,
      });

      return c.json(task);
    }
  )

  .delete("/:id", async (c) => {
    const id = +c.req.param("id");

    const task = await prisma.task.delete({
      where: {
        id,
      },
    });

    return c.json(task);
  });
