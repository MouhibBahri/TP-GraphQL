import { GraphQLContext } from '../context';

export const Skill = {
  cvs: (skill: { id: string }, _a: unknown, ctx: GraphQLContext) =>
    ctx.db.cvs.filter((cv) =>
      ctx.db.cvSkill.some(
        (cs) => cs.cvId === cv.id && cs.skillId === skill.id,
      ),
    ),
};
