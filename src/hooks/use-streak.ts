import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

export interface StreakResponse {
  current: number;
  longest: number;
  started: Date;
  lastDate: Date;
  totalAttempts: number;
  hasCompletedToday: boolean;
}

const initialResponse = {
  current: 0,
  longest: 0,
  startedAt: null,
  lastDate: null,
  totalAttempts: 0,
  hasCompletedToday: false,
};


export const useStreak = () => {
  const {
    data,
    isPending: isLoadingStreak,
    refetch,
  } = useQuery<StreakResponse>({
    queryKey: ['streak'],
    queryFn: () => axios.get(`/api/me/streak`).then((res) => res.data),
    retry: (count, error) => {
      if (axios.isAxiosError(error) && error.response?.status === 404)
        return false;

      return count < 1;
    },
  });

  const streak = useMemo(() => {
    return data
      ? {
          ...data,
          lastDate: data.lastDate
            ? new Date(data.lastDate).toLocaleDateString(undefined, {
                month: 'short',
                day: 'numeric',
              })
            : null,
        }
      : initialResponse;
  }, [data]);

  return {
    streak,
    isLoadingStreak,
    refetch,
  };
};
