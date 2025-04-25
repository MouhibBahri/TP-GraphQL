import { GraphQLContext } from '../context';

export const Cv = {
  user: (cv: { userId: string }, _a: unknown, ctx: GraphQLContext) =>
    ctx.prisma.user.findUnique({
      where: { id: cv.userId },
    }),

  skills: (cv: { id: string }, _a: unknown, ctx: GraphQLContext) =>
    ctx.prisma.skill.findMany({
      where: {
        cvs: {
          some: {
            id: cv.id,
          },
        },
      },
    }),
};
