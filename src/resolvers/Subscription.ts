import { pubsub } from '../pubsub';

export const Subscription = {
  cvEvents: {
    subscribe: () => pubsub.subscribe('CV_EVENTS'),
    resolve: (payload: { type: string; cv: unknown }) => payload,
  },
};
