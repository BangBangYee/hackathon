'use client';

import { Tabs } from '@/components/ui/tabs';
import { ProjectForm } from '@/components/ui/project-form';
import { useEffect, useState } from 'react';

export default function MainPage() {
  const [project, setProject] = useState<any>();

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
    <Tabs defaultValue="all">{project ? <div></div> : <ProjectForm />}</Tabs>
  );
}
