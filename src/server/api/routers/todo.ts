import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const todoRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const tasks = await ctx.prisma.task.findMany({
      take: 35,
      where: { userId: ctx.auth.userId! },
    });
    return tasks;
  }),
  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const task = await ctx.prisma.task.create({
        data: {
          title: input.title,
          description: input.description,
          userId: ctx.auth.userId!,
        },
      });
      return task;
    }),
  delete: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const task = await ctx.prisma.task.delete({
        where: {
          id: input.id,
        },
      });
      return task;
    }),
});
