import { notFound } from 'next/navigation';

import { getCurrentUser } from '@/auth/sessions';
import { ExerciseConfig } from '@/features/exercise/types';
import { PlayerPage } from '@/views/PlayerPage';
import { parseExerciseConfig } from './util';

type PageProps = {
  searchParams: Promise<{
    config?: string;
  }>;
};

const ExercisePlayer = async ({ searchParams }: PageProps) => {
  const params = await searchParams;
  const user = await getCurrentUser();

  const config = parseExerciseConfig(params.config);

  if (!config) notFound();

  return <PlayerPage config={config as ExerciseConfig} isLoggedIn={!!user} />;
};

export default ExercisePlayer;
