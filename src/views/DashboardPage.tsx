'use client';

import { SimpleGrid, Stack } from '@chakra-ui/react';

import { ActivityWidget } from '@/features/dashboard/components/ActivityWidget';
import { ExerciseWidget } from '@/features/dashboard/components/ExerciseWidget';
import { StatsWidget } from '@/features/dashboard/components/StatsWidget';
import { Layout } from '@/components/Layout';

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
      <Stack w="full" maxW={{ base: 'full', md: '9/12' }} mx="auto" gap={8}>
        <Layout.TitleBlock
          header={pageCTA.header}
          description={pageCTA.description}
        />

        <ExerciseWidget
          gridTemplateColumns={{
            base: 'repeat(2, minmax(0, 1fr))',
            md: 'repeat(4, minmax(160px, 1fr))',
          }}
        />
        <SimpleGrid
          gridTemplateColumns={{
            base: '1fr',
            sm: '1fr 1.6fr',
          }}
          w='full'
          gap={8}
        >
          <ActivityWidget />
          <StatsWidget />
        </SimpleGrid>
      </Stack>
    </Layout.PageContainer>
  );
};
