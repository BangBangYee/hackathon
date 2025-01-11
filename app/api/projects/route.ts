import { createProject } from '@/lib/db';

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
