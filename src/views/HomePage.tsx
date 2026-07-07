'use client';

import { VStack } from '@chakra-ui/react';


import { ExerciseWidget } from '@/features/dashboard/components/ExerciseWidget';
import { Layout } from '@/components/layout/Layout';

const cta = {
  header: 'Choose an exercise to start practicing',
  description: 'Create an account anytime to track your progress.',
};
/**
 * This component renders the EarTuner home page.
 */
export const HomePage = () => {
  return (
    <Layout.PageContainer>
      <VStack gap={16}>
        {/* heading */}
        <Layout.TitleBlock
          header={cta.header}
          description={cta.description}
          align="center"
          justifyContent={{ base: 'center' }}
        />

        {/* exercise types */}
        <ExerciseWidget columns={2} />
      </VStack>
    </Layout.PageContainer>
  );
};
