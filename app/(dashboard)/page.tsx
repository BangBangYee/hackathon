import { Tabs } from '@/components/ui/tabs';
import { ProjectForm } from '@/components/ui/project-form';

export default async function MainPage() {
  return (
    <Tabs defaultValue="all">
      <ProjectForm />
    </Tabs>
  );
}
