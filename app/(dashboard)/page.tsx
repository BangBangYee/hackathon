'use client';

import { Tabs } from '@/components/ui/tabs';
import { ProjectForm } from '@/components/ui/project-form';
import { useEffect, useState } from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Percentage from '@/components/ui/Percentage';
import { memberList } from '@/lib/mocked';

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

  const [busPosition, setBusPosition] = useState(200);
  const [direction, setDirection] = useState(1);

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

  useEffect(() => {
    const interval = setInterval(() => {
      setBusPosition((prev) => {
        if (prev >= 210) {
          setDirection(-1); // 방향을 위로 변경
          return prev - 1; // 감소
        } else if (prev <= 190) {
          setDirection(1); // 방향을 아래로 변경
          return prev + 1; // 증가
        }
        return prev + direction; // 현재 방향에 따라 값 업데이트
      });
    }, 15); // 0.1초 간격으로 업데이트

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 interval 정리
  }, [direction]);

  return (
    <Tabs defaultValue="all">
      {project ? (
        <div className="flex flex-col">
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

          <div className="w-fill h-96 relative mt-10">
            <Image src="/bus-bg.png" alt="bus-bg" fill />
            <Image
              src="/bus.png"
              alt="bus"
              width={700}
              height={100}
              className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              style={{ top: `${busPosition}px` }} // 동적으로 top 값 설정
            />
            <Image
              src="/bird/driver1.png"
              alt="driver"
              width={70}
              height={70}
              className="absolute left-1/3 transform -translate-x-1/2 -translate-y-1/2"
              style={{ top: `${busPosition - 45}px` }}
            />
          </div>

          <div className="flex-1 bg-gray-200 rounded-full h-4 mt-3">
            <div
              className="h-4 rounded-full bg-purple-500 z-20"
              style={{
                width: `${(new Date().getTime() / new Date(project?.endAt).getTime() / 10) * 100}%`
              }}
            ></div>
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col">
              <p>시작일</p>
              <p>{new Date(project.createdAt).toLocaleDateString()}</p>
            </div>
            <div className="flex flex-col">
              <p>종료일</p>
              <p>{new Date(project.endAt).toLocaleDateString()}</p>
            </div>
          </div>
          <div className="flex space-x-2">
            {memberList.map((member) => {
              return <Percentage key={member.id} {...member} />;
            })}
          </div>
        </div>
      ) : (
        <ProjectForm />
      )}
    </Tabs>
  );
}
