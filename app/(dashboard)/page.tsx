'use client';

import { Tabs } from '@/components/ui/tabs';
import { ProjectForm } from '@/components/ui/project-form';
import { useEffect, useState } from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function MainPage() {
  const [project, setProject] = useState<{
    id: number;
    repoUrl: string;
    name: string;
    description: string;
    status: string;
    endAt: Date;
    createdAt: Date;
  }>();

  useEffect(() => {
    fetch('/api/projects', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          setProject(data.data.projects);
        });
      }
    });
  }, []);

  return (
    <Tabs defaultValue="all">
      {project ? (
        <div className="space-y-2">
          <Label className="text-3xl">{project.name}</Label>
          <div className="flex gap-3">
            <Image
              src="/time-clock.png"
              alt="time-clock"
              width={24}
              height={24}
            />
            <Button className="rounded-full bg-purple-500" disabled>
              {new Date(project?.endAt).getDate() - new Date().getDate()} days
            </Button>
          </div>
        </div>
      ) : (
        <ProjectForm />
      )}
    </Tabs>
  );
}
