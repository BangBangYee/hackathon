import { StateCreator } from 'zustand/vanilla';
import { persist, PersistOptions } from 'zustand/middleware';
import { create } from 'zustand/react';

export type PercentageType = {
  userId: number;
  percentage: number;
};

interface PercentStore {
  percentList: PercentageType[];
  setPercentList: (data: any) => void;
  clearPercentList: () => void;
}

type PercentPersist = (
  config: StateCreator<PercentStore>,
  options: PersistOptions<PercentStore>
) => StateCreator<PercentStore>;

const usePercentStore = create<PercentStore>(
  (persist as PercentPersist)(
    (set) => ({
      percentList: [
        {
          userId: 1,
          percentage: 0
        },
        {
          userId: 2,
          percentage: 0
        },
        {
          userId: 3,
          percentage: 0
        },
        {
          userId: 4,
          percentage: 0
        },
        {
          userId: 5,
          percentage: 0
        }
      ],
      setPercentList: (percent) => set({ percentList: percent }),
      clearPercentList: () =>
        set({
          percentList: [
            {
              userId: 1,
              percentage: 0
            },
            {
              userId: 2,
              percentage: 0
            },
            {
              userId: 3,
              percentage: 0
            },
            {
              userId: 4,
              percentage: 0
            },
            {
              userId: 5,
              percentage: 0
            }
          ]
        })
    }),
    {
      name: 'percentStore'
    }
  )
);
export default usePercentStore;
