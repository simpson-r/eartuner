import { signIn } from 'next-auth/react';

import { useMutation } from '@tanstack/react-query';

/**
 * Hook that makes request that enables logging in a user.
 */
export const useLogin = (email: string) => {
  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: () => {
      return signIn('email', { email, redirect: false, callbackUrl: '/dashboard' });
    },
  });

  return { isPending, isSuccess, login: mutate };
};
