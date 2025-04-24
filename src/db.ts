/* eslint-disable @typescript-eslint/explicit-function-return-type */


/* ---------- "tables" à plat ---------- */

// USERS
export let users = [
  { id: 'u1', name: 'Alice', email: 'alice@mail.com', role: 'ADMIN' },
  { id: 'u2', name: 'Bob',   email: 'bob@mail.com',   role: 'USER'  },
] 

// SKILLS
export let skills = [
  { id: 's1', designation: 'TypeScript' },
  { id: 's2', designation: 'GraphQL'    },
  { id: 's3', designation: 'Docker'     },
] ;

// CVS
export let cvs = [
  { id: 'c1', name: 'Alice Senior Dev', age: 28, job: 'Full‑stack dev', userId: 'u1' },
  { id: 'c2', name: 'Bob Junior Dev',  age: 22, job: 'Backend dev',    userId: 'u2' },
] ;

/**
 * Table de jonction N:M Cv – Skill
 * (chaque tuple relie un CV à une compétence).
 */
export let cvSkill = [
  { cvId: 'c1', skillId: 's1' },
  { cvId: 'c1', skillId: 's2' },
  { cvId: 'c1', skillId: 's3' },
  { cvId: 'c2', skillId: 's1' },
] ;

/* ---------- Utilitaires simples ---------- */

export function findUserById(id: string) {
  return users.find((u) => u.id === id) ?? null;
}

export function findCvById(id: string) {
  return cvs.find((c) => c.id === id) ?? null;
}

export function findSkillById(id: string) {
  return skills.find((s) => s.id === id) ?? null;
}

export function getSkillsForCv(cvId: string) {
  const skillIds = cvSkill.filter((cs) => cs.cvId === cvId).map((cs) => cs.skillId);
  return skills.filter((s) => skillIds.includes(s.id));
}

export function getCvsForUser(userId: string) {
  return cvs.filter((c) => c.userId === userId);
}

export function getUserForCv(cvId: string) {
  const cv = findCvById(cvId);
  return cv ? findUserById(cv.userId) : null;
}
