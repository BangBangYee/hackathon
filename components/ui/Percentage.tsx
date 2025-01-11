import { useEffect, useState } from 'react';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Image from 'next/image';
import usePercentStore from '@/lib/percentage.';

const Percentage = (member: {
  id: number;
  position: string;
  comment: string;
  image: string;
  task: { id: number; name: string }[];
}) => {
  const setPercentStore = usePercentStore((state) => state.setPercentList);
  const percentStore = usePercentStore((state) => state.percentList);

  const [checkedItems, setCheckedItems] = useState<number[]>([]); // 체크된 항목 관리
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 창 상태 관리

  const totalItems = member.task.length; // 전체 리스트 항목 수
  const percentage = (checkedItems.length / totalItems) * 100; // 퍼센트 계산

  const handleCheckboxChange = (item: number) => {
    setCheckedItems((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  useEffect(() => {
    const index = percentStore.findIndex((p) => p.userId === member.id);
    if (index === -1) {
      setPercentStore([...percentStore, { userId: member.id, percentage }]);
    } else {
      const newPercentList = [...percentStore];
      newPercentList[index] = { userId: member.id, percentage };
      setPercentStore(newPercentList);
    }
  }, [checkedItems]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="text-center mt-12 relative">
      {/* Profile Card */}
      <div className="relative w-72 h-auto mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
        {/* Circular Progress Bar with Outer Circle and Image */}
        <div className="relative w-60 h-60 mx-auto flex items-center justify-center rounded-full bg-white z-10">
          <div
            className="relative w-48 h-48 cursor-pointer"
            onClick={toggleModal}
          >
            <CircularProgressbar
              value={percentage}
              text={''}
              styles={buildStyles({
                pathColor: '#E17CFD',
                trailColor: '#4CD7F6'
              })}
            />
            <Image
              src={member.image}
              alt="Progress Indicator"
              width={80}
              height={80}
              className="absolute top-[5%] left-[5%] w-[90%] h-[90%] rounded-full object-cover"
            />
          </div>
          <span className="absolute bottom-[-20px] left-1/2 transform -translate-x-1/2 text-lg font-bold text-gray-700">
            {Math.round(percentage)}%
          </span>
          <Image
            src={
              percentage <= 20
                ? '/cute-icon/sleeping-icon.png'
                : percentage <= 80
                  ? '/cute-icon/working-icon.png'
                  : '/cute-icon/studying-icon.png'
            }
            alt="Cute Icon"
            width={percentage <= 20 ? 80 : percentage <= 80 ? 60 : 80}
            height={80}
            className="absolute bottom-[-30px] right-[-30px] object-cover"
          />
        </div>

        {/* Position and Comment Display */}
        <div className="mt-6 text-left">
          <div>
            <p className="text-lg font-semibold">{member.position}</p>
            <p className="text-gray-700">{member.comment}</p>
          </div>
        </div>
      </div>

      {/* Checklist Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-100">
          <div className="bg-white p-6 rounded-lg w-80">
            <h2 className="text-lg font-bold mb-4">TODO List</h2>
            <ul className="list-none p-0">
              {member.task.map((t, index) => {
                return (
                  <li key={index} className="mb-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={checkedItems.includes(index)}
                        onChange={() => handleCheckboxChange(index)}
                        className="mr-2"
                      />
                      {t.name}
                    </label>
                  </li>
                );
              })}
            </ul>
            <button
              onClick={toggleModal}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Percentage;
