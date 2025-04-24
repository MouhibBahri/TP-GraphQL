import { GraphQLContext } from '../context';

export const Cv = {
  user: (cv: { userId: string }, _a: unknown, ctx: GraphQLContext) =>
    ctx.db.findUserById(cv.userId),

  skills: (cv: { id: string }, _a: unknown, ctx: GraphQLContext) =>
    ctx.db.getSkillsForCv(cv.id),
};
