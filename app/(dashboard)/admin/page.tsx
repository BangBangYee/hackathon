'use client';

import { Tabs } from '@/components/ui/tabs';
import TaskManager from '@/components/ui/TaskManager';

export default function AdminPage() {
  return (
    <Tabs defaultValue="all">
      <TaskManager />
    </Tabs>
  );
}
