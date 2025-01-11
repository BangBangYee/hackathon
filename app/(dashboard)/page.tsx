'use client';

import { Tabs } from '@/components/ui/tabs';
import { ProjectForm } from '@/components/ui/project-form';
import { useEffect, useState } from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Percentage from '@/components/ui/Percentage';
import { memberList } from '@/lib/mocked';
import usePercentStore from '@/lib/percentage.';

export default function MainPage() {
  const percentStore = usePercentStore((state) => state.percentList);
  const clearPercentList = usePercentStore((state) => state.clearPercentList);

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
  const [userIds, setUserIds] = useState<number[]>([1, 2, 3, 4, 5]);

  useEffect(() => {
    fetch('/api/projects', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    }).then((res) => {
      if (res.ok) {
        clearPercentList();
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

  const sortUserIdsByPercentage = (list: any[]): number[] => {
    // 리스트를 percentage 기준으로 내림차순 정렬
    const sortedList = list.sort((a, b) => b.percentage - a.percentage);
    // 정렬된 리스트에서 userId만 추출하여 반환
    return sortedList.map((item) => item.userId);
  };

  useEffect(() => {
    const sortedUserIds = sortUserIdsByPercentage(percentStore);
    setUserIds(sortedUserIds);
  }, [percentStore]);

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
              src={userIds[0] === 1 ? '/bird/driver1.png' : '/bird/bird1.png'}
              alt="driver"
              width={70}
              height={70}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{
                top: `${busPosition - 45}px`,
                left:
                  userIds[0] === 1
                    ? '510px'
                    : userIds[1] === 1
                      ? '670px'
                      : userIds[2] === 1
                        ? '830px'
                        : userIds[3] === 1
                          ? '990px'
                          : '1300px'
              }}
            />
            <Label
              className="absolute text-md text-white font-bold"
              style={{
                top: `${busPosition - 10}px`,
                left:
                  userIds[0] === 1
                    ? '500px'
                    : userIds[1] === 1
                      ? '660px'
                      : userIds[2] === 1
                        ? '820px'
                        : userIds[3] === 1
                          ? '980px'
                          : '1200px'
              }}
            >
              예원
            </Label>
            <Image
              src={userIds[0] === 2 ? '/bird/driver2.png' : '/bird/bird2.png'}
              alt="bird2"
              width={70}
              height={70}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{
                top: `${busPosition - 45}px`,
                left:
                  userIds[0] === 2
                    ? '510px'
                    : userIds[1] === 2
                      ? '670px'
                      : userIds[2] === 2
                        ? '830px'
                        : userIds[3] === 2
                          ? '990px'
                          : '1300px'
              }}
            />
            <Label
              className="absolute text-md text-white font-bold"
              style={{
                top: `${busPosition - 10}px`,
                left:
                  userIds[0] === 2
                    ? '500px'
                    : userIds[1] === 2
                      ? '660px'
                      : userIds[2] === 2
                        ? '820px'
                        : userIds[3] === 2
                          ? '980px'
                          : '1200px'
              }}
            >
              현택
            </Label>
            <Image
              src={userIds[0] === 3 ? '/bird/driver3.png' : '/bird/bird3.png'}
              alt="bird3"
              width={70}
              height={70}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{
                top: `${busPosition - 45}px`,
                left:
                  userIds[0] === 3
                    ? '510px'
                    : userIds[1] === 3
                      ? '670px'
                      : userIds[2] === 3
                        ? '830px'
                        : userIds[3] === 3
                          ? '990px'
                          : '1300px'
              }}
            />
            <Label
              className="absolute text-md text-white font-bold"
              style={{
                top: `${busPosition - 10}px`,
                left:
                  userIds[0] === 3
                    ? '500px'
                    : userIds[1] === 3
                      ? '660px'
                      : userIds[2] === 3
                        ? '820px'
                        : userIds[3] === 3
                          ? '980px'
                          : '1200px'
              }}
            >
              유빈
            </Label>
            <Image
              src={userIds[0] === 4 ? '/bird/driver4.png' : '/bird/bird4.png'}
              alt="bird4"
              width={70}
              height={70}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{
                top: `${busPosition - 45}px`,
                left:
                  userIds[0] === 4
                    ? '510px'
                    : userIds[1] === 4
                      ? '670px'
                      : userIds[2] === 4
                        ? '830px'
                        : userIds[3] === 4
                          ? '990px'
                          : '1300px'
              }}
            />
            <Label
              className="absolute text-md text-white font-bold"
              style={{
                top: `${busPosition - 10}px`,
                left:
                  userIds[0] === 4
                    ? '500px'
                    : userIds[1] === 4
                      ? '660px'
                      : userIds[2] === 4
                        ? '820px'
                        : userIds[3] === 4
                          ? '980px'
                          : '1200px'
              }}
            >
              승겸
            </Label>
            <Image
              src={'/bird/pm.png'}
              alt="pm"
              width={70}
              height={70}
              className="absolute left-[1300px] transform -translate-x-1/2 -translate-y-1/2"
              style={{
                top: `${busPosition + 45}px`
              }}
            />
            <Label
              className="absolute text-md text-white font-bold"
              style={{
                top: `${busPosition + 70}px`,
                left:
                  userIds[0] === 5
                    ? '505px'
                    : userIds[1] === 5
                      ? '665px'
                      : userIds[2] === 5
                        ? '825px'
                        : userIds[3] === 5
                          ? '985px'
                          : '1295px'
              }}
            >
              영준
            </Label>
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
