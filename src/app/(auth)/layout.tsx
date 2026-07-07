import type { Metadata } from 'next';

import { Layout } from '@/components/layout/Layout';
import { getCurrentSessionRedirect } from '@/lib/sessions';

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
  const session = await getCurrentSessionRedirect();

  return <Layout session={session}>{children}</Layout>;
}
