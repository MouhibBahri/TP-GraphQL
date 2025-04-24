import { GraphQLContext } from '../context';
import { randomUUID } from 'crypto';
import { pubsub } from '../PubSub';

export const Mutation = {
  /* ----------------- CREATE ----------------- */
  createCv: (
    _parent: unknown,
    args: { data: {
      name: string; age: number; job: string;
      userId: string; skillIds: string[];
    }},
    ctx: GraphQLContext,
  ) => {
    const { data } = args;

    // 1. vérifications de base
    if (!ctx.db.findUserById(data.userId)) {
      throw new Error('User not found');
    }
    data.skillIds.forEach((sid) => {
      if (!ctx.db.findSkillById(sid)) {
        throw new Error(`Skill ${sid} not found`);
      }
    });

    // 2. insertion “en mémoire”
    const newCv = {
      id: randomUUID(),
      name: data.name,
      age: data.age,
      job: data.job,
      userId: data.userId,
    };
    ctx.db.cvs.push(newCv);

    // 3. table de jonction
    data.skillIds.forEach((sid) =>
      ctx.db.cvSkill.push({ cvId: newCv.id, skillId: sid }),
    );
    pubsub.publish('CV_EVENTS', { type: 'CREATED', cv: newCv });


    return newCv;
  },

  /* ----------------- UPDATE ----------------- */
  updateCv: (
    _p: unknown,
    args: { id: string; data: {
      name?: string; age?: number; job?: string;
      userId?: string; skillIds?: string[];
    }},
    ctx: GraphQLContext,
  ) => {
    const cv = ctx.db.findCvById(args.id);
    if (!cv) throw new Error('CV not found');

    const { data } = args;

    // maj simples
    if (data.name !== undefined) cv.name = data.name;
    if (data.age  !== undefined) cv.age  = data.age;
    if (data.job  !== undefined) cv.job  = data.job;

    // changement de propriétaire
    if (data.userId !== undefined) {
      if (!ctx.db.findUserById(data.userId)) {
        throw new Error('User not found');
      }
      cv.userId = data.userId;
    }

    // mise à jour des skills
    if (data.skillIds !== undefined) {
      // validation
      data.skillIds.forEach((sid) => {
        if (!ctx.db.findSkillById(sid)) {
          throw new Error(`Skill ${sid} not found`);
        }
      });
      // 1. supprimer liaisons existantes
      ctx.db.cvSkill = ctx.db.cvSkill.filter(
        (cs) => cs.cvId !== cv.id,
      );
      // 2. recréer
      data.skillIds.forEach((sid) =>
        ctx.db.cvSkill.push({ cvId: cv.id, skillId: sid }),
      );
    }
    pubsub.publish('CV_EVENTS', { type: 'UPDATED', cv });

    return cv;
  },

  /* ---------- bonus : DELETE ---------- */
  deleteCv: (
    _p: unknown,
    args: { id: string },
    ctx: GraphQLContext,
  ) => {
    const index = ctx.db.cvs.findIndex((c) => c.id === args.id);
    if (index === -1) return false;

    ctx.db.cvs.splice(index, 1);
    ctx.db.cvSkill = ctx.db.cvSkill.filter(
      (cs) => cs.cvId !== args.id,
    );
    pubsub.publish('CV_EVENTS', { type: 'DELETED', cv: { id: args.id, name: '', age: 0, job: '', userId: '' } });
    return true;
  },
};
