export interface GraphQLContext {
    db: typeof import('./db');
    currentUser?: { id: string; name?: string; email?: string };
  }
  