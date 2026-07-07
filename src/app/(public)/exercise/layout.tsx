import type { Metadata } from 'next';

import { PlayerLayout } from '@/components/layout/Layout';

export const metadata: Metadata = {
  title: 'Ear Trainer',
  description: 'Create personalized training exercises',
};

/**
 * This component renders the layout for the root layout for the webapp
 */
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <PlayerLayout>{children}</PlayerLayout>;
}
