'use client';

import { Icon, Link, VStack } from '@chakra-ui/react';

import DrumsticksIcon from '@/assets/drumsticks.svg?component';
import { Layout } from '@/components/Layout';
import { ElevatedButton } from '@/components/ElevatedButton';

/**
 * This component renders the EarTuner home page.
 */
export const NotFoundPage = () => {
  return (
    <Layout.PageContainer flex={1} justify="center" align="center">
      <VStack gap={16}>
        <Icon as={DrumsticksIcon} boxSize="180px" />
        <Layout.TitleBlock
          header="Oops!"
          description="The page you're looking for doesn't exist."
          fontSize="5xl"
        />
        <ElevatedButton
          size="xl"
          surfaceColor="cobalt.500"
          shadowColor="cobalt.600"
          asChild
        >
          <Link href="/" textDecoration="none">
            Back to home
          </Link>
        </ElevatedButton>
      </VStack>
    </Layout.PageContainer>
  );
};
