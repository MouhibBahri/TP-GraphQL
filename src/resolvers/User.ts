import { GraphQLContext } from '../context';

export const User = {
  cvs: (user: { id: string }, _a: unknown, ctx: GraphQLContext) =>
    ctx.db.getCvsForUser(user.id),
};
