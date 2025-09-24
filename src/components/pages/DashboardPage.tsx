"use client";

import { Session } from "next-auth";
import { FaArrowRight } from "react-icons/fa";

import {
  Button,
  GridItem,
  Heading,
  Icon,
  Link,
  SimpleGrid,
  Stack,
} from "@chakra-ui/react";
import { Attempt, Exercise } from "@prisma/client";

import { ActivityList } from "@/components/AttemptList";
import PageContainer from "@/components/layout/PageContainer";
import { ExerciseList } from "@/components/ExerciseList";
import { StatsList } from "@/components/StatsList";

/**
 * This component renders the home dashboard page for the given user.
 */
export const DashboardPage = ({
  user,
  attempts,
  exercises,
}: {
  user: Session["user"];
  attempts: Attempt[] | null;
  exercises: Exercise[] | null;
}) => {
  const handleExerciseClick = () => {};

  return (
    <PageContainer>
      <Stack gap={6} w="100%">
        <Stack
          direction={{ base: "column", md: "row" }}
          justifyContent={{ base: "center", md: "space-between" }}
          alignItems="center"
          gap={4}
        >
          <Heading fontSize="4xl" fontWeight="bold">
            Ready to train your ear today?
          </Heading>
          <Button size="lg" asChild>
            <Link href="/exercises">
              Start training <Icon as={FaArrowRight} size="xs" />
            </Link>
          </Button>
        </Stack>
        <Heading fontSize="xl">Dashboard overview</Heading>
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
          <GridItem>
            <ExerciseList exercises={exercises} onClick={handleExerciseClick} />
          </GridItem>

          <GridItem>
            <SimpleGrid rowGap={2} gap={4} h="full">
              <ActivityList attempts={attempts} />
              <StatsList />
            </SimpleGrid>
          </GridItem>
        </SimpleGrid>
      </Stack>
    </PageContainer>
  );
};
