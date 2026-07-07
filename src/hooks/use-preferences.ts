import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { toaster } from '@/components/ui/toaster';
import { ClientPreferences } from '@/features/exercise/types';
import { useSession } from 'next-auth/react';

/**
 * Hook to manage fetching and updating the authenticated user's preferences
 */
export const usePreferences = () => {
  const { status } = useSession();
  const queryClient = useQueryClient();
  // GET - fetch preference data for authenticated user
  const {
    data,
    isPending: isLoadingPreferences,
    isError: isUpdateError,
  } = useQuery({
    queryKey: ['preferences'],
    queryFn: () => axios.get(`/api/me/preferences`).then((res) => res.data),
    enabled: status === 'authenticated',
  });

  // PATCH - Update user preferences
  const { mutate: updatePreferences, isSuccess: isUpdateSuccess } = useMutation(
    {
      mutationFn: (body: Partial<ClientPreferences>) =>
        axios.patch(`/api/me/preferences`, body).then((res) => res.data),

      onMutate: async (newPreferences) => {
        await queryClient.cancelQueries({ queryKey: ['preferences'] });

        const prev = queryClient.getQueryData(['preferences']);

        queryClient.setQueryData(
          ['preferences'],
          (old: { preferences: ClientPreferences }) => ({
            ...old,
            preferences: { ...old?.preferences, ...newPreferences },
          }),
        );

        return { prev };
      },

      onError: (err, newPreferences, context) => {
        // rollback to old data if API fails
        if (context?.prev) {
          queryClient.setQueryData(['preferences'], context.prev);
        }
        toaster.create({
          description: 'Preference failed to update',
          type: 'error',
        });
      },

      onSuccess: () => {
        toaster.create({
          description: 'Preference updated',
          type: 'info',
        });
      },

      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: ['preferences'] });
      },
    },
  );

  return {
    preferences: data?.preferences,
    isLoadingPreferences,
    isUpdateSuccess,
    isUpdateError,
    updatePreferences,
  };
};
