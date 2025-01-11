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
  endAt: timestamp('end_at', { mode: 'string' }).notNull(),
  createdAt: timestamp('created_at', { mode: 'string' }).notNull()
});
export type SelectProjects = typeof projects.$inferSelect;
export const insertProjectSchema = createInsertSchema(projects);

export async function getProjects(id: number): Promise<SelectProjects[]> {
  return db.select().from(projects).where(eq(projects.id, id));
}

export async function getProjectsByUser(userId: number) {
  return db
    .select()
    .from(projects)
    .innerJoin(projectMembers, eq(projects.id, projectMembers.projectId))
    .where(eq(projectMembers.userId, userId));
}

export async function createProject(body: {
  name: string;
  repoUrl: string;
  description: string;
  endAt: string;
  createdAt: string;
}) {
  return db
    .insert(projects)
    .values({ ...body, status: 'active' })
    .execute();
}

export const projectMembers = pgTable('projects_users', {
  projectId: integer('project_id').notNull(),
  userId: integer('user_id').notNull(),
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at', { mode: 'string' }).notNull()
});
export type SelectProjectMembers = typeof projectMembers.$inferSelect;
export const insertProjectMembersSchema = createInsertSchema(projectMembers);

export async function addProjectMember(projectId: number, userId: number) {
  return db
    .insert(projectMembers)
    .values({
      projectId: projectId,
      userId: userId,
      createdAt: new Date().toISOString()
    })
    .execute();
}

export const task = pgTable('tasks', {
  id: serial('id').primaryKey(),
  projectId: integer('project_id').notNull(),
  userId: integer('user_id').notNull(),
  title: text('title').notNull(),
  status: statusEnum('status').notNull(),
  createdAt: timestamp('created_at', { mode: 'string' }).notNull()
});
export type SelectTasks = typeof task.$inferSelect;
export const insertTaskSchema = createInsertSchema(task);
export async function getTasks(
  userId: number,
  projectId: number
): Promise<SelectTasks[]> {
  return db
    .select()
    .from(task)
    .where(eq(task.userId, userId) && eq(task.projectId, projectId));
}

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: text('email').notNull(),
  name: text('name').notNull()
});
export type SelectUsers = typeof users.$inferSelect;
export const insertUserSchema = createInsertSchema(users);

export async function getUsers(email: string): Promise<SelectUsers[]> {
  return db.select().from(users).where(eq(users.email, email));
}

export async function createUser(email: string, name: string) {
  return db.insert(users).values({ email, name }).execute();
}
