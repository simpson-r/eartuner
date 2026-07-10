import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { ExerciseType } from '@prisma/client';
import { useMemo } from 'react';
import { AccuracyMapResult } from '@/app/api/me/stats/types';

export type BreakdownByType = {
  type: ExerciseType;
  questions: number;
  attempts: number;
  averageScore: number;
};

export interface StreakData {
  current: number;
  longest: number;
  started: Date | null;
  lastDate: Date | null;
  totalAttempts: number;
  hasCompletedToday: boolean;
}

export interface MeStatsResponse {
  summary: {
    averageScore: number;
    attempts: number;
    questions: number;
    duration: number;
  };
  breakdownByType: BreakdownByType[];
  streak: StreakData;
  questionAccuracyByType: AccuracyMapResult;
}

/**
 * Hook to fetch combined stats + streak data for the authenticated user.
 */
export const useMeStats = () => {
  const { data, isPending: isLoadingMeStats } = useQuery<MeStatsResponse>({
    queryKey: ['me-stats'],
    queryFn: () => axios.get('/api/me/stats').then((res) => res.data),
    retry: (count, error) => {
      if (axios.isAxiosError(error) && error.response?.status === 404)
        return false;
      return count < 1;
    },
  });

  const streak = useMemo(() => {
    return data?.streak
      ? {
          ...data?.streak,
          lastDate: data.streak?.lastDate
            ? new Date(data.streak?.lastDate).toLocaleDateString('en-GB', {
                month: 'short',
                day: 'numeric',
              })
            : null,
        }
      : {
          current: 0,
          longest: 0,
          startedAt: null,
          lastDate: null,
          totalAttempts: 0,
          hasCompletedToday: false,
        };
  }, [data]);

  return {
    stats: data
      ? { summary: data.summary, breakdownByType: data.breakdownByType }
      : undefined,
    streak,
    isLoadingMeStats,
    questionAccuracyByType: data?.questionAccuracyByType,
  };
};
