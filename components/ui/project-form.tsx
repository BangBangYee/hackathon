'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon, Plus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const FormSchema = z.object({
  name: z.string({
    required_error: '프로젝트명은 필수값입니다.'
  }),
  description: z.string({
    required_error: '프로젝트 설명은 필수값입니다.'
  }),
  repoUrl: z.string({
    required_error: '프로젝트 Github Repo URL은 필수값입니다.'
  }),
  endAt: z.date({
    required_error: '종료일은 필수값입니다.'
  })
});

function onSubmit(data: z.infer<typeof FormSchema>) {
  fetch('/api/projects', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      data
    })
  }).then((res) => {
    if (res.ok) {
      alert('프로젝트가 등록되었습니다.');
    }
  });
}

export function ProjectForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema)
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Label htmlFor="project title" className="text-lg">
          프로젝트를 등록해주세요
        </Label>
        <div className="grid w-full max-w-sm items-center gap-1.5 mt-5">
          <FormField
            control={form.control}
            name="name"
            defaultValue={''}
            render={({ field }) => (
              <FormItem>
                <FormLabel>프로젝트명 *</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="프로젝트명" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            defaultValue={''}
            render={({ field }) => (
              <FormItem>
                <FormLabel>프로젝트 설명</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="프로젝트 설명" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="repoUrl"
            defaultValue={''}
            render={({ field }) => (
              <FormItem>
                <FormLabel>프로젝트 Github Repo URL *</FormLabel>
                <FormControl>
                  <Input
                    type="url"
                    placeholder="프로젝트 Github Repo URL"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="endAt"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>프로젝트 종료일 *</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-[240px] pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value ? (
                        format(field.value, 'PPP')
                      ) : (
                        <span>종료일을 지정해주세요.</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                프로젝트 종료일은 프로젝트 시작일 이후여야 합니다.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="gap-1">
          <Plus className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Add Project
          </span>
        </Button>
      </form>
    </Form>
  );
}
