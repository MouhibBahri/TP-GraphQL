import { GraphQLContext } from '../context';

export const Mutation = {
  createCv: async (
    _parent: unknown,
    args: { data: {
      name: string; age: number; job: string;
      userId: string; skillIds: string[];
    }},
    ctx: GraphQLContext,
  ) => {
    const { data } = args;

    const user = await ctx.prisma.user.findUnique({
      where: { id: data.userId },
    });
    if (!user) {
      throw new Error('User not found');
    }

    for (const skillId of data.skillIds) {
      const skill = await ctx.prisma.skill.findUnique({
        where: { id: skillId },
      });
      if (!skill) {
        throw new Error(`Skill ${skillId} not found`);
      }
    }

    const newCv = await ctx.prisma.cv.create({
      data: {
        name: data.name,
        age: data.age,
        job: data.job,
        user: {
          connect: { id: data.userId },
        },
        skills: {
          connect: data.skillIds.map(id => ({ id })),
        },
      },
      include: {
        user: true,
        skills: true,
      },
    });

    ctx.pubsub.publish('CV_EVENTS', {
      type: 'CREATED',
      cv: newCv
    });

    return newCv;
  },

  updateCv: async (
    _p: unknown,
    args: { id: string; data: {
      name?: string; age?: number; job?: string;
      userId?: string; skillIds?: string[];
    }},
    ctx: GraphQLContext,
  ) => {
    const { id, data } = args;

    // Check if CV exists
    const existingCv = await ctx.prisma.cv.findUnique({
      where: { id },
    });
    if (!existingCv) {
      throw new Error('CV not found');
    }

    if (data.userId) {
      const user = await ctx.prisma.user.findUnique({
        where: { id: data.userId },
      });
      if (!user) {
        throw new Error('User not found');
      }
    }

    if (data.skillIds) {
      for (const skillId of data.skillIds) {
        const skill = await ctx.prisma.skill.findUnique({
          where: { id: skillId },
        });
        if (!skill) {
          throw new Error(`Skill ${skillId} not found`);
        }
      }
    }

    const updateData: any = {};

    if (data.name !== undefined) updateData.name = data.name;
    if (data.age !== undefined) updateData.age = data.age;
    if (data.job !== undefined) updateData.job = data.job;

    if (data.userId !== undefined) {
      updateData.user = { connect: { id: data.userId } };
    }

    if (data.skillIds !== undefined) {
      updateData.skills = {
        set: [],
        connect: data.skillIds.map(id => ({ id })),
      };
    }

    const updatedCv = await ctx.prisma.cv.update({
      where: { id },
      data: updateData,
      include: {
        user: true,
        skills: true,
      },
    });

    ctx.pubsub.publish('CV_EVENTS', {
      type: 'UPDATED',
      cv: updatedCv
    });

    return updatedCv;
  },

  deleteCv: async (
    _p: unknown,
    args: { id: string },
    ctx: GraphQLContext,
  ) => {
    const { id } = args;

    const existingCv = await ctx.prisma.cv.findUnique({
      where: { id },
      include: {
        user: true,
        skills: true,
      },
    });

    if (!existingCv) {
      return false;
    }

    await ctx.prisma.cv.delete({
      where: { id },
    });

    ctx.pubsub.publish('CV_EVENTS', {
      type: 'DELETED',
      cv: existingCv
    });

    return true;
  },
};
