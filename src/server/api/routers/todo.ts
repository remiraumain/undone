import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const todoRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const tasks = await ctx.prisma.task.findMany({
      take: 35,
      where: { userId: ctx.auth.userId! },
    });
    return tasks;
  }),
});
