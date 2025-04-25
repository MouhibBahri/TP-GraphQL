import { PrismaClient, Role } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.cv.deleteMany();
  await prisma.skill.deleteMany();
  await prisma.user.deleteMany();

  const alice = await prisma.user.create({
    data: {
      name: 'Alice',
      email: 'alice@mail.com',
      role: Role.ADMIN,
    },
  });

  const bob = await prisma.user.create({
    data: {
      name: 'Bob',
      email: 'bob@mail.com',
      role: Role.USER,
    },
  });

  const typescript = await prisma.skill.create({
    data: {
      designation: 'TypeScript',
    },
  });

  const graphql = await prisma.skill.create({
    data: {
      designation: 'GraphQL',
    },
  });

  const docker = await prisma.skill.create({
    data: {
      designation: 'Docker',
    },
  });

  await prisma.cv.create({
    data: {
      name: 'Alice Senior Dev',
      age: 28,
      job: 'Full-stack dev',
      user: {
        connect: { id: alice.id },
      },
      skills: {
        connect: [
          { id: typescript.id },
          { id: graphql.id },
          { id: docker.id },
        ],
      },
    },
  });

  await prisma.cv.create({
    data: {
      name: 'Bob Junior Dev',
      age: 22,
      job: 'Backend dev',
      user: {
        connect: { id: bob.id },
      },
      skills: {
        connect: [{ id: typescript.id }],
      },
    },
  });

  console.log('Database has been seeded!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
