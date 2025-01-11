import { Plus } from 'lucide-react';
import { auth } from '@/lib/auth';
import { Tabs } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default async function MainPage() {
  let session = await auth();
  let user = session?.user;

  console.log(user);

  return (
    <Tabs defaultValue="all">
      <div className="flex items-center">
        <div className="ml-auto flex items-center gap-2"></div>
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="project title">프로젝트를 등록해주세요!</Label>
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input type="url" placeholder="프로젝트 Github URL" />
          <Button type="submit" className="gap-1">
            <Plus className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add Project
            </span>
          </Button>
        </div>
      </div>
    </Tabs>
  );
}
