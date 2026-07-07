import type { Metadata } from 'next';

import { PlayerLayout, LayoutProps } from '@/components/Layout';

export const metadata: Metadata = {
  title: 'Exercise - EarTuner',
  description: 'Practice a custom ear training exercise.',
};
export default function ExerciseLayout({ children }: LayoutProps) {
  return <PlayerLayout>{children}</PlayerLayout>;
}
