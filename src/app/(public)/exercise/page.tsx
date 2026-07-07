import { notFound } from 'next/navigation';

import { PlayerPage } from '@/views/PlayerPage';
import { exerciseConfigSchema } from '@/config/parse';
import { getCurrentUser } from '@/lib/sessions';
import { ExerciseConfig } from '@/utils/types';

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

function parseExerciseConfig(raw?: string) {
  if (!raw) return null;

  try {
    const parsed = JSON.parse(atob(raw));
    return exerciseConfigSchema.parse(parsed);
  } catch {
    return null;
  }
}
