import { PrismaClient } from '@prisma/client';
import { createPubSub } from 'graphql-yoga';

export type CvEvent = {
  type: 'CREATED' | 'UPDATED' | 'DELETED';
  cv: any;
};

export const pubsub = createPubSub<{
  CV_EVENTS: [CvEvent];
}>();

const prisma = new PrismaClient();

export type GraphQLContext = {
  prisma: PrismaClient;
  pubsub: typeof pubsub;
  currentUser?: { id: string; name?: string; email?: string };
};

export function createContext(): GraphQLContext {
  return {
    prisma,
    pubsub,
  };
}