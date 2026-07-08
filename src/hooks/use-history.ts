import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ExerciseCreateRequest } from '@/features/exercise/types';

/**
 * Hook to manage creating execution attempts for a specific exercise type
 */
export const useHistory = () => {
    const queryClient = useQueryClient();
  // POST - Create a new exercise record
  const {
    mutate: create,
    data: createdAttemptData,
    isPending: isCreating,
    isSuccess: isCreateSuccess,
  } = useMutation({
    mutationFn: (body: ExerciseCreateRequest) =>
      axios.post(`/api/history`, body).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['me-stats'] });
    },
  });

  // DELETE - Delete exercise records and reset streak for authenticated user
  const { mutate: resetHistory, isPending: isResetting } = useMutation({
    mutationFn: () => axios.delete(`/api/history`).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['me-stats'] });
    },
  });

  return {
    newAttempt: createdAttemptData?.attempt,
    isCreating,
    isCreateSuccess,
    isResetting,
    create,
    resetHistory,
  };
};
