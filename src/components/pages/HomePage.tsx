"use client";

import { SimpleGrid, VStack } from "@chakra-ui/react";

import { Block } from "@/components/Block";
import PageContainer from "@/components/layout/PageContainer";
import { exercises } from "@/utils/exercises";
import { PageHeader } from "../layout/LayoutUtils";

const cta = {
  header: "Train Your Musical Ear",
  description:
    "Improve your ability to recognize intervals, chords, and scales with personalized exercises!",
};
/**
 * This component renders the EarTrainer home page.
 */
export const HomePage = () => {
  return (
    <PageContainer>
      <VStack gap={16} my={8}>
        {/* heading */}
        <PageHeader
          header={cta.header}
          description={cta.description}
          align="center"
        />

        {/* exercise types */}
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={12}>
          {exercises.map((exercise) => (
            <Block
              key={exercise.title}
              label={exercise.title}
              icon={exercise.icon}
              description={exercise.description}
            />
          ))}
        </SimpleGrid>
      </VStack>
    </PageContainer>
  );
};
