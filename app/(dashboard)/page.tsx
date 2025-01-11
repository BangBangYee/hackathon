import { Tabs } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CalendarForm } from '@/components/ui/date-picker';

export default async function MainPage() {
  return (
    <Tabs defaultValue="all">
      <Label htmlFor="project title" className="text-lg">
        프로젝트를 등록해주세요
      </Label>
      <div className="grid w-full max-w-sm items-center gap-1.5 mt-5">
        <Label htmlFor="project title">프로젝트 Github Repo URL</Label>
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input type="url" placeholder="프로젝트 Github URL" />
        </div>
      </div>
      <CalendarForm />
    </Tabs>
  );
}
