import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { ExerciseType } from '@prisma/client';

export type BreakdownByType = {
  type: ExerciseType;
  questions: number;
  attempts: number;
  averageScore: number;
};

export interface StatsResponse {
  summary: {
    averageScore: number;
    totalAttempts: number;
    totalQuestions: number;
    totalDuration: number;
  };
  breakdownByType: BreakdownByType[];
}

/**
 * Hook to fetch the stats data for a specific user.
 */
export const useStats = () => {
  // GET - fetch statistics data for the authenticated user
  const { data, isPending: isLoadingStats } = useQuery<StatsResponse>({
    queryKey: ['stats'],
    queryFn: () => axios.get('/api/me/stats').then((res) => res.data),
    retry: (count, error) => {
      if (axios.isAxiosError(error) && error.response?.status === 404)
        return false;

      return count < 1;
    },
  });


  return {
    stats: data,
    isLoadingStats,
  };
};
