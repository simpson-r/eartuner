"use client";

import { Session } from "next-auth";

import { GridItem, SimpleGrid, Stack, Flex } from "@chakra-ui/react";

import { ActivityList } from "@/components/ActivityList";
import PageContainer from "@/components/layout/PageContainer";
import { ExerciseList } from "@/components/ExerciseList";
import { StatsList } from "@/components/StatsList";
import { PageHeader } from "../layout/LayoutUtils";

const cta = {
  header: "Ready to train?",
  description:
    "See your exercises, recent activity, and stats at a glance. Start training anytime to track improvement.",
};

/**
 * This component renders the home dashboard page for the given user.
 */
export const DashboardPage = ({}: { user: Session["user"] }) => {
  return (
    <PageContainer>
      <Stack gap={6} w="full" h="full">
        {/* page header */}
        <PageHeader header={cta.header} description={cta.description} />
        {/* body */}
        <Flex h="full" direction="column" minH={0} >
          <SimpleGrid columns={{ base: 1, md: 2 }} gap={6} flex="1" minH="0">
            <GridItem h="full" minH={0}>
              <ExerciseList />
            </GridItem>
            <GridItem h="full" minH={0}>
              <SimpleGrid rowGap={2} gap={4}>
                <ActivityList />
                <StatsList />
              </SimpleGrid>
            </GridItem>
          </SimpleGrid>
        </Flex>
      </Stack>
    </PageContainer>
  );
};
