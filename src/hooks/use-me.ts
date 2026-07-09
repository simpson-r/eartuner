import axios from 'axios';
import { useMutation } from '@tanstack/react-query';

/**
 * Hook to fetch data for a specific user.
 */
export const useMe = () => {
  // DELETE - Delete authenticated user's account and all associated data
  const deleteAccount = useMutation({
    mutationFn: () => axios.delete('/api/me'),
  });

  return {
    deleteAccount: deleteAccount.mutate,
    isDeletingAccount: deleteAccount.isPending,
  };
};
