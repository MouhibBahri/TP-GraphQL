import { GraphQLContext } from '../context';

export const Query = {
  // SELECT * FROM users
  users: (_parent: unknown, _args: unknown, ctx: GraphQLContext) =>
    ctx.db.users,

  // SELECT * FROM users WHERE id = $1
  user: (_parent: unknown, args: { id: string }, ctx: GraphQLContext) =>
    ctx.db.findUserById(args.id),

  cvs: (_p: unknown, _a: unknown, ctx: GraphQLContext) => ctx.db.cvs,

  cv: (_p: unknown, args: { id: string }, ctx: GraphQLContext) =>
    ctx.db.findCvById(args.id),

  skills: (_p: unknown, _a: unknown, ctx: GraphQLContext) => ctx.db.skills,
};
