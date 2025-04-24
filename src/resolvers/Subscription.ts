import { pubsub } from '../PubSub';

export const Subscription = {
  cvEvents: {
    // AsyncIterator permettant à Yoga (ou Apollo) de pousser les messages
    subscribe: () => pubsub.subscribe('CV_EVENTS'),
    // resolve facultatif : forward tel quel
    resolve: (payload: { type: string; cv: unknown }) => payload,
  },
};
