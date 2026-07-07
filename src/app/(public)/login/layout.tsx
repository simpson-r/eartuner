import type { Metadata } from 'next';

import { Layout } from '@/components/layout/Layout';


export const metadata: Metadata = {
  title: 'Ear Trainer',
  description: 'Create personalized ear training exercises',
};

/**
 * This component renders the layout for the root layout for the webapp
 */
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Layout session={null}>{children}</Layout>;
}
