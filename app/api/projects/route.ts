import { createProject, getProjectsByUser, getUsers } from '@/lib/db';
import { auth } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const session = await request.json();
  await createProject({
    ...session.data,
    endAt: session.data.endAt.toString(),
    createdAt: new Date().toISOString()
  });
  return Response.json({
    message: 'Project created successfully'
  });
}

export async function GET() {
  let session = await auth();
  let user = session?.user;
  let dbUser;

  if (user) {
    if (typeof user.email === 'string' && typeof user.name === 'string') {
      dbUser = await getUsers(user.email);
      const projects = await getProjectsByUser(dbUser[0].id);

      return Response.json({
        message: 'Project fetched successfully',
        data: projects[0]
      });
    }
  }
}
