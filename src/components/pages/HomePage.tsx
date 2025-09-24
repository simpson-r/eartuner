"use client";

import { useState } from "react";

import {
  Heading,
  SimpleGrid,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";

import { Block } from "@/components/Block";
import PageContainer from "@/components/layout/PageContainer";
import { ExerciseModal } from "@/components/ExerciseModal";
import { Exercise } from "@/lib/types";
import { exercises } from "@/utils/exercises";

/**
 * This component renders the EarTrainer home page.
 */
export const HomePage = () => {
  const { open, onOpen, onClose } = useDisclosure();
  const [exercise, setExercise] = useState<Exercise>("intervals");

  return (
    <PageContainer>
      <VStack gap={16} my={8}>
        {/* heading */}
        <VStack gap={8} textAlign="center">
          <Heading fontSize="4xl">Train Your Musical Ear</Heading>
          <Text color="gray.600">
            Improve your ability to recognize intervals, chords, and scales with
            personalized exercises!
          </Text>
        </VStack>

        {/* exercise types */}
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={12}>
          {exercises.map((exercise) => (
            <Block
              key={exercise.title}
              label={exercise.title}
              icon={exercise.icon}
              description={exercise.description}
              onClick={() => {
                setExercise(exercise.type);
                onOpen();
              }}
            />
          ))}
        </SimpleGrid>
      </VStack>
      {/* modal */}
      <ExerciseModal isOpen={open} type={exercise} onClose={onClose} />
    </PageContainer>
  );
};
