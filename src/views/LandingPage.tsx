'use client';

import { Flex, VStack } from '@chakra-ui/react';

import { ExerciseWidget } from '@/features/dashboard/components/ExerciseWidget';
import { Layout } from '@/components/layout/Layout';
import { FeatureSection } from '@/components/layout/FeatureSection';

const cta = {
  header: 'Choose an exercise to start practicing',
  description: 'Create an account anytime to track your progress.',
};
/**
 * This component renders the EarTuner landing page.
 */
export const LandingPage = () => {
  return (
    <Layout.PageContainer maxW='5xl'>
      <VStack gap={{ base: 8, md: 12 }}>
        {/* heading */}
        <Layout.TitleBlock
          header={cta.header}
          description={cta.description}
          align="center"
          justifyContent={{ base: 'center' }}
          textAlign="center"
        />
        {/* exercise types */}
        <Flex>
          <ExerciseWidget columns={2} />
        </Flex>
        {/* feature section */}
        <FeatureSection />
      </VStack>
    </Layout.PageContainer>
  );
};
