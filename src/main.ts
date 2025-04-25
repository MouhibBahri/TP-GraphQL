import { createSchema, createYoga } from 'graphql-yoga';
import { createServer } from 'http';
import path from 'path';
import fs from 'fs';
import { Mutation } from './resolvers/Mutation';
import { Subscription } from './resolvers/Subscription';

import * as db from './db';
import { Query } from './resolvers/Query';
import { Cv } from './resolvers/Cv';
import { User } from './resolvers/User';
import { Skill } from './resolvers/Skill';

const schema = createSchema({
  typeDefs: fs.readFileSync(
    path.join(__dirname, 'schema/schema.graphql'),
    'utf-8',
  ),
  resolvers: {
    Query,
    Cv,
	Mutation,
	Subscription,
    User,
    Skill,
  },
});

const yoga = createYoga({
  schema,
  context: () => ({ db }), 
});

const server = createServer(yoga);
server.listen(4000, () =>
  console.info('http://localhost:4000/graphql'),
);
