import type { Metadata } from 'next';

import { Layout, LayoutProps } from '@/components/Layout';

export const metadata: Metadata = {
  title: 'Log in - EarTuner',
  description: 'Log in to EarTuner to save your progress and practice history.',
};

export default function LoginLayout({ children }: LayoutProps) {
  return <Layout session={null}>{children}</Layout>;
}
