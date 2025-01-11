import React, { useState } from 'react';

// 팀원과 태스크 타입 정의
type Member = '영준' | '유빈' | '예원' | '승겸' | '현택';
type Task = { id: number; name: string; assignedMember: Member | null };

const members: Member[] = ['영준', '유빈', '예원', '승겸', '현택'];

const TaskManager: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, name: 'UI 디자인 수정', assignedMember: null },
    { id: 2, name: 'API 엔드포인트 개발', assignedMember: null },
    { id: 3, name: 'DB 스키마 설계', assignedMember: null },
    { id: 4, name: '테스트 코드 작성', assignedMember: null },
    { id: 5, name: '배포 자동화 스크립트 작성', assignedMember: null },
    { id: 6, name: '로그 수집 모듈 구현', assignedMember: null },
    { id: 7, name: '리팩토링 계획 수립', assignedMember: null },
    { id: 8, name: 'CI/CD 파이프라인 설정', assignedMember: null },
    { id: 9, name: '코드 리뷰 진행', assignedMember: null },
    { id: 10, name: '버그 수정 및 핫픽스', assignedMember: null },
  ]);

  const [newTaskName, setNewTaskName] = useState<string>(''); // 새로운 Task 이름 입력값
  const [selectedMember, setSelectedMember] = useState<Member>('영준'); // 선택된 팀원

  // 팀원 할당 핸들러
  const handleAssignMember = (taskId: number, member: Member) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, assignedMember: member } : task
      )
    );
  };

  // 새로운 Task 추가 핸들러
  const handleAddTask = () => {
    if (newTaskName.trim() === '') return; // 입력값이 비어있으면 추가하지 않음

    const newTask: Task = {
      id: tasks.length + 1, // 고유 ID 생성
      name: newTaskName,
      assignedMember: selectedMember,
    };

    setTasks((prevTasks) => [...prevTasks, newTask]); // 새로운 Task 추가
    setNewTaskName(''); // 입력값 초기화
  };

  // 각 팀원별 할당된 Task 목록 생성
  const tasksByMember = members.reduce<{ [key in Member]: Task[] }>((acc, member) => {
    acc[member] = tasks.filter((task) => task.assignedMember === member);
    return acc;
  }, {} as { [key in Member]: Task[] });

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ marginBottom: '20px', textAlign: 'center' }}>Task Management</h1>

      {/* Task 리스트 UI */}
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {tasks.map((task) => (
          <li
            key={task.id}
            style={{
              margin: '15px 0',
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '10px 15px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            }}
          >
            <div>
              <strong>{task.name}</strong>
            </div>

            <div style={{ display: 'flex', alignItems: 'center' }}>
              {/* 할당된 팀원 표시 */}
              <span
                style={{
                  display: 'inline-block',
                  padding: '5px 10px',
                  borderRadius: '20px',
                  backgroundColor: task.assignedMember ? '#e0f7fa' : '#f0f0f0',
                  marginRight: '10px',
                  fontSize: '14px',
                  color: task.assignedMember ? '#00796b' : '#777',
                }}
              >
                {task.assignedMember ? task.assignedMember : '없음'}
              </span>

              {/* 커스텀 드롭다운 메뉴 */}
              <div style={{ position: 'relative' }}>
                <select
                  onChange={(e) => handleAssignMember(task.id, e.target.value as Member)}
                  value={task.assignedMember || ''}
                  style={{
                    padding: '5px 10px',
                    borderRadius: '5px',
                    border: '1px solid #ddd',
                    cursor: 'pointer',
                    appearance: 'none',
                    backgroundColor: '#f9f9f9',
                    outline: 'none',
                  }}
                >
                  <option value="" disabled>
                    팀원 선택
                  </option>
                  {members.map((member) => (
                    <option key={member} value={member}>
                      {member}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <hr style={{ margin: '40px 0' }} />

      {/* 새로운 Task 추가 UI */}
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <h2>새로운 Task 추가</h2>
        <input
          type="text"
          placeholder="Task 이름 입력"
          value={newTaskName}
          onChange={(e) => setNewTaskName(e.target.value)}
          style={{
            padding: '10px',
            width: '60%',
            marginRight: '10px',
            borderRadius: '5px',
            border: '1px solid #ddd',
          }}
        />
        <select
          value={selectedMember}
          onChange={(e) => setSelectedMember(e.target.value as Member)}
          style={{
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #ddd',
            marginRight: '10px',
            cursor: 'pointer',
          }}
        >
          {members.map((member) => (
            <option key={member} value={member}>
              {member}
            </option>
          ))}
        </select>
        <button
          onClick={handleAddTask}
          style={{
            padding: '10px 20px',
            borderRadius: '5px',
            border: 'none',
            backgroundColor: '#00796b',
            color: 'white',
            cursor: 'pointer',
          }}
        >
          추가
        </button>
      </div>

      {/* 팀원별 할당된 Task UI */}
      <h2 style={{ textAlign: 'center' }}>Team Member Task Overview</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {members.map((member) => (
          <li
            key={member}
            style={{
              margin: '15px 0',
              padding: '10px 15px',
              border: '1px solid #ddd',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            }}
          >
            <div style={{ fontWeight: 'bold', marginBottom: '10px' }}>{member}</div>
            {tasksByMember[member].length > 0 ? (
              <ul style={{ paddingLeft: '20px', margin: 0 }}>
                {tasksByMember[member].map((task) => (
                  <li key={task.id} style={{ marginBottom: '5px' }}>
                    {task.name}
                  </li>
                ))}
              </ul>
            ) : (
              <div style={{ color: '#777' }}>할당된 Task가 없습니다.</div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;
