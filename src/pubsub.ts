import { createPubSub } from 'graphql-yoga';

export const pubsub = createPubSub<{
  CV_EVENTS: [{ type: 'CREATED' | 'UPDATED' | 'DELETED'; cv: unknown }];
}>();
