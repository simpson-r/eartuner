'use client';

import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { useState } from 'react';

import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ColorModeProvider } from '@/theme/color-mode';
import { system } from '@/theme';

export function Providers({
  session,
  children,
}: React.PropsWithChildren<{
  session: Session | null;
}>) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  return (
    <ChakraProvider value={system}>
      <ColorModeProvider>
        <SessionProvider session={session} refetchOnWindowFocus={false}>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </SessionProvider>
      </ColorModeProvider>
    </ChakraProvider>
  );
}
