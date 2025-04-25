import { GraphQLContext } from '../context';

export const Query = {
  users: (_parent: unknown, _args: unknown, ctx: GraphQLContext) =>
    ctx.prisma.user.findMany(),

  user: (_parent: unknown, args: { id: string }, ctx: GraphQLContext) =>
    ctx.prisma.user.findUnique({
      where: { id: args.id },
    }),

  cvs: (_p: unknown, _a: unknown, ctx: GraphQLContext) =>
    ctx.prisma.cv.findMany(),

  cv: (_p: unknown, args: { id: string }, ctx: GraphQLContext) =>
    ctx.prisma.cv.findUnique({
      where: { id: args.id },
    }),

  skills: (_p: unknown, _a: unknown, ctx: GraphQLContext) =>
    ctx.prisma.skill.findMany(),
};
