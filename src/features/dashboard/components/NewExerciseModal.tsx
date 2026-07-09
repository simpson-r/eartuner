'use client';

import { Dialog, IconButton } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

import { ExerciseType } from '@prisma/client';

import { ExerciseConfig } from '@/features/exercise/types';
import { ExerciseForm } from './ExerciseForm';
import { HiX } from 'react-icons/hi';
import { EXERCISE_NAME_MAP } from '../../../../constants';

const getModalCTA = (exerciseType: ExerciseType) => {
  return {
    heading: `Configure ${EXERCISE_NAME_MAP[exerciseType]} exercise`,
    description: `Choose the ${EXERCISE_NAME_MAP[exerciseType]} types and number of questions.`,
  };
};

/**
 * This component displays a modal for configuring a custom ear training exercise.
 */
export const NewExerciseModal = ({
  exerciseType,
  isOpen,
  onClose,
}: {
  exerciseType: ExerciseType;
  isOpen: boolean;
  onClose: VoidFunction;
}) => {
  const router = useRouter();

  /* HANDLERS */
  const handleExerciseCreate = async (config: ExerciseConfig) => {
    const encoded = btoa(JSON.stringify(config)); // base-64 encoding

    router.push(`/exercise?config=${encoded}`);
  };
  const cta = getModalCTA(exerciseType);

  return (
    <Dialog.Root
      placement="center"
      open={isOpen}
      lazyMount
      unmountOnExit
      onEscapeKeyDown={onClose}
    >
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content rounded="2xl" bgColor="bg.panel" p={8}>
          {/* header */}
          <Dialog.Header
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={2}
          >
            <Dialog.Title fontSize="2xl">{cta.heading}</Dialog.Title>
            <Dialog.Description color="fg.muted">
              {cta.description}
            </Dialog.Description>
          </Dialog.Header>

          <Dialog.CloseTrigger top={4} right={2} asChild>
            <IconButton
              as={HiX}
              variant="ghost"
              onClick={onClose}
              boxSize={6}
            />
          </Dialog.CloseTrigger>

          <ExerciseForm
            exerciseType={exerciseType}
            onCreate={handleExerciseCreate}
            onClose={onClose}
          />
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
};
