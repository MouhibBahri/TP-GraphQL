import { GraphQLContext } from '../context';

export const Subscription = {
  cvEvents: {
    subscribe: (_parent: unknown, _args: unknown, ctx: GraphQLContext) =>
      ctx.pubsub.subscribe('CV_EVENTS'),
    resolve: (payload: { type: string; cv: unknown }) => payload,
  },
};
