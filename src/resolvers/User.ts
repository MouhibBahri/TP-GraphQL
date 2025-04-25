import { GraphQLContext } from '../context';

export const User = {
  cvs: (user: { id: string }, _a: unknown, ctx: GraphQLContext) =>
    ctx.prisma.cv.findMany({
      where: {
        userId: user.id,
      },
    }),
};
