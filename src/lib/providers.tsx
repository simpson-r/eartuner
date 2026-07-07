'use client';

import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { useState } from 'react';

import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { PreferencesProvider } from '@/context/PreferencesContext';
import { ColorModeProvider } from '@/lib/color-mode';
import { system } from '@/lib/theme';


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
        <SessionProvider session={session}>
          <QueryClientProvider client={queryClient}>
            <PreferencesProvider>{children}</PreferencesProvider>
          </QueryClientProvider>
        </SessionProvider>
      </ColorModeProvider>
    </ChakraProvider>
  );
}
