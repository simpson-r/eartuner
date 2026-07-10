import { Session } from 'next-auth';
import React from 'react';

import {
  Container,
  Flex,
  Heading,
  Stack,
  StackProps,
  Text,
  VStack,
} from '@chakra-ui/react';

import Header from '@/components/layout/Header';
import { Toaster } from '@/components/ui/toaster';
import Footer from './Footer';

type BaseLayoutProps = React.PropsWithChildren<{
  session: Session | null;
}>;

export type LayoutProps = Readonly<{
  children: React.ReactNode;
}>;

/**
 * LAYOUT COMPONENTS
 */
export const Layout = ({ children, session }: BaseLayoutProps) => {
  return (
    <Flex direction="column" minH="100dvh" w="100vw" bgColor="bg.panel">
      <Header session={session} />
      <Flex as="main" flex="1" w="100%" overflow="auto">
        {children}
      </Flex>
      <Toaster />
      <Footer />
    </Flex>
  );
};

export const PlayerLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <Flex direction="column" minH="100dvh" w="100vw" bgColor="bg.panel">
      <Flex as="main" flex="1" w="100%" overflow="auto">
        {children}
      </Flex>
      <Toaster />
    </Flex>
  );
};

interface PageHeaderProps extends Omit<StackProps, 'children'> {
  header: React.ReactNode;
  description?: React.ReactNode;
}

/**
 * LAYOUT SUBCOMPONENTS
 */
export const TitleBlock = ({
  header,
  description,
  ...props
}: PageHeaderProps) => (
  <Stack gap={2} {...props}>
    {typeof header === 'string' ? (
      <Heading fontSize="3xl" as="h1">
        {header}
      </Heading>
    ) : (
      header
    )}
    {description && (
      <Text fontSize="sm" color="fg.muted">
        {description}
      </Text>
    )}
  </Stack>
);

export const PageContainer = (props: StackProps) => (
  <Container as={VStack} maxW="4xl" py={{ base: 10, md: 12 }} {...props} />
);

Layout.TitleBlock = TitleBlock;
Layout.PageContainer = PageContainer;
