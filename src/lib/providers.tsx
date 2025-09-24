"use client";

import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ColorModeProvider } from "@/lib/color-mode";
import { system } from "@/lib/theme";

export function Providers({
  session,
  children,
}: React.PropsWithChildren<{
  session: Session | null;
}>) {
  const queryClient = new QueryClient();

  return (
    <ChakraProvider value={system}>
      <ColorModeProvider>
        <SessionProvider session={session}>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </SessionProvider>
      </ColorModeProvider>
    </ChakraProvider>
  );
}
