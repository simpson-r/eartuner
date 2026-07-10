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
      <Stack w="full" maxW="900px" mx="auto" gap={8} px={{ base: 4, md: 0 }}>
        <Layout.TitleBlock
          header={pageCTA.header}
          description={pageCTA.description}
        />

        <ExerciseWidget
          gridTemplateColumns={{
            base: 'repeat(2, 1fr)',
            md: 'repeat(4, minmax(160px, 1fr))',
          }}
        />

        <SimpleGrid
          gridTemplateColumns={{
            base: '1fr',
            md: '1fr 1fr',
          }}
          w="full"
          gap={8}
        >
          <ActivityWidget />
          <StatsWidget />
        </SimpleGrid>
      </Stack>
    </Layout.PageContainer>
  );
};
