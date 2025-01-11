import 'server-only';

import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import {
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp
} from 'drizzle-orm/pg-core';
import { eq } from 'drizzle-orm';
import { createInsertSchema } from 'drizzle-zod';

export const db = drizzle(neon(process.env.POSTGRES_URL!));

export const statusEnum = pgEnum('status', ['active', 'inactive', 'archived']);

export const projects = pgTable('projects', {
  id: serial('id').primaryKey(),
  repoUrl: text('repo_url').notNull(),
  name: text('name').notNull(),
  description: text('description'),
  status: statusEnum('status').notNull(),
  endAt: timestamp('end_at').notNull(),
  createdAt: timestamp('created_at').notNull()
});
export type SelectProjects = typeof projects.$inferSelect;
export const insertProjectSchema = createInsertSchema(projects);

export async function getProjects(id: number): Promise<SelectProjects[]> {
  return db.select().from(projects).where(eq(projects.id, id));
}

export const projectMembers = pgTable('project_users', {
  projectId: integer('project_id').notNull(),
  userId: integer('user_id').notNull(),
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at').notNull()
});
export type SelectProjectMembers = typeof projectMembers.$inferSelect;
export const insertProjectMembersSchema = createInsertSchema(projectMembers);
