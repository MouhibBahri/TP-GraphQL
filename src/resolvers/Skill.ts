import { GraphQLContext } from '../context';

export const Skill = {
  cvs: (skill: { id: string }, _a: unknown, ctx: GraphQLContext) =>
    ctx.prisma.cv.findMany({
      where: {
        skills: {
          some: {
            id: skill.id,
          },
        },
      },
    }),
};
