import type { Metadata } from 'next';

import { getCurrentSessionRedirect } from '@/auth/sessions';
import { Layout, LayoutProps } from '@/components/layout/Layout';

export const metadata: Metadata = {
  title: 'EarTuner',
  description: 'Create personalized training exercises',
};

export default async function AuthLayout({ children }: LayoutProps) {
  const session = await getCurrentSessionRedirect();

  return <Layout session={session}>{children}</Layout>;
}
