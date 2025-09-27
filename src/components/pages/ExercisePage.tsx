"use client";

import { useState } from "react";

import { SimpleGrid, Stack, useDisclosure } from "@chakra-ui/react";
import { ExerciseType } from "@prisma/client";

import { Block } from "@/components/Block";
import { ExerciseModal } from "@/components/ExerciseModal";
import PageContainer from "@/components/layout/PageContainer";
import { useExercises } from "@/hooks/use-exercises";
import { exercises } from "@/utils/exercises";
import { CreateExerciseBody } from "@/utils/types";
import { PageHeader } from "../layout/LayoutUtils";

const cta = {
  header: "Pick an exercise and begin",
  description:
    "Sharpen your ear with personalized interval, chord, and scale exercises.",
};

/**
 * This component renders the entry point to the exercise creation flow.
 */
export const ExercisePage = () => {
  const { isLoadingCreate, create } = useExercises();
  const { open, onClose, onOpen } = useDisclosure();
  const [exerciseType, setExerciseType] = useState<ExerciseType>(
    ExerciseType.Interval
  );

  /* handlers */
  const handleCreate = async (exerciseData: CreateExerciseBody) => {
    await create(exerciseData);
  };

  const handleOpenModal = (type: ExerciseType) => {
    setExerciseType(type);
    onOpen();
  };

  return (
    <PageContainer>
      <Stack gap={12} w="7/12" margin="0 auto">
        {/* page header */}
        <PageHeader header={cta.header} description={cta.description} />

        {/* exercise types */}
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={12}>
          {exercises.map((exercise) => (
            <Block
              key={exercise.title}
              label={exercise.title}
              icon={exercise.icon}
              description={exercise.description}
              onClick={() => handleOpenModal(exercise.type)}
              showButton
            />
          ))}
        </SimpleGrid>
      </Stack>
      {/* modal */}
      <ExerciseModal
        type={exerciseType}
        isOpen={open}
        isLoading={isLoadingCreate}
        onClose={onClose}
        onCreate={handleCreate}
      />
    </PageContainer>
  );
};
