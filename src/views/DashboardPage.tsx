'use client';

import { SimpleGrid, Stack } from '@chakra-ui/react';

import { ActivityWidget } from '@/features/dashboard/components/ActivityWidget';
import { ExerciseWidget } from '@/features/dashboard/components/ExerciseWidget';
import { StatsWidget } from '@/features/dashboard/components/StatsWidget';
import { Layout } from '@/components/layout/Layout';

const pageCTA = {
  header: 'Dashboard',
  description:
    'Choose an exercise to begin. Track your progress as you improve.',
};

/**
 * This component renders the home dashboard page for the given user.
 */
export const DashboardPage = () => {
  return (
    <Layout.PageContainer>
      <Stack maxW="8/12" w="full" gap={8}>
        <Layout.TitleBlock
          header={pageCTA.header}
          description={pageCTA.description}
        />

        <ExerciseWidget columns={{ base: 2, md: 4 }} />
        <SimpleGrid gridTemplateColumns="1fr 1.6fr" gap={8}>
          <ActivityWidget />
          <StatsWidget />
        </SimpleGrid>
      </Stack>
    </Layout.PageContainer>
  );
};
