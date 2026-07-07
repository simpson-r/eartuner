'use client';

import { Dialog, Heading, HStack, Icon, Stack, Text } from '@chakra-ui/react';
import { type ExerciseType } from '@prisma/client';

import { EXERCISE_TYPE_CONFIG } from '@/config/exercises';
import { ElevatedButton } from '@/components/ElevatedButton';

/**
 * This component displays a modal for configuring a custom ear training exercise.
 */
export const ExerciseSelect = ({
  onExerciseClick,
}: {
  onExerciseClick: (exerciseType: ExerciseType) => void;
}) => {
  return (
    <Dialog.Body>
      <Stack gap={6}>
        {EXERCISE_TYPE_CONFIG.map(({ description, icon, title, type }) => (
          <ElevatedButton
            key={title}
            onClick={() => onExerciseClick(type)}
            whiteSpace="normal"
            minH="unset"
            h="auto"
            w="full"
            px={6}
            py={4}
          >
            {/* heading + description */}
            <Stack align="start" w="full" gap={0}>
              <HStack justify="flex-start" w="full">
                <Icon as={icon} boxSize={4} />
                <Heading fontSize="md">{title}</Heading>
              </HStack>

              <Text color="fg.muted" fontSize="xs" textAlign="left">
                {description}
              </Text>
            </Stack>
          </ElevatedButton>
        ))}
      </Stack>
    </Dialog.Body>
  );
};
