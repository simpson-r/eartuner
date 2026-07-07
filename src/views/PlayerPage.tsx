'use client';

import { VStack } from '@chakra-ui/react';

import { ExercisePlayer } from '@/features/exercise/ExercisePlayer';
import { ExerciseConfig } from '@/utils/types';

/**
 * This component renders the entry point to the exercise creation flow.
 */
export const PlayerPage = ({
  config,
  isLoggedIn,
}: {
  config: ExerciseConfig;
  isLoggedIn: boolean;
}) => {
  return (
    <VStack w="100%" h="100vh" flex="1" mx="auto">
      {/* player */}
      <ExercisePlayer config={config} isLoggedIn={isLoggedIn} />
    </VStack>
  );
};
