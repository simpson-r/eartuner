"use client";

import { Session } from "next-auth";
import { FaArrowRight } from "react-icons/fa";

import {
  Heading,
  SimpleGrid,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

import { Block } from "@/components/Block";
import PageContainer from "@/components/layout/PageContainer";
import { exercises } from "@/utils/exercises";
import { Exercise } from "@/lib/types";
import { useState } from "react";
import { ExerciseModal } from "../ExerciseModal";

/**
 * This component renders the home dashboard page for the given user.
 */
export const ExercisePage = ({}: {}) => {
  const [exercise, setExercise] = useState<Exercise>("chords");
  const { open, onClose, onOpen } = useDisclosure();

  return (
    <PageContainer>
      <Stack gap={12} w="100%">
        {/* heading */}
        <Stack gap={8} textAlign="center">
          <Heading fontSize="4xl">Train Your Musical Ear</Heading>
          <Text color="gray.600">
            Improve your ability to recognize intervals, chords, and scales with
            personalized exercises!
          </Text>
        </Stack>

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
              showButton
            />
          ))}
        </SimpleGrid>
      </Stack>
      <ExerciseModal type={exercise} isOpen={open} onClose={onClose} />
    </PageContainer>
  );
};
