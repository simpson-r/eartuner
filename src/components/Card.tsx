import React from 'react';

import {
  Box,
  BoxProps,
  Center,
  Heading,
  Icon,
  Link,
  Spinner,
  Stack,
  Text,
  VStack,
  type StackProps,
} from '@chakra-ui/react';

import { IconType } from 'react-icons/lib';
import { ElevatedButton } from './ElevatedButton';

/**
 * This component renders a pure functional "Card" component that houses widget-like lists within the dashboard
 */
export const Card = ({
  children,
  ...props
}: React.PropsWithChildren<StackProps>) => {
  return (
    <Stack
      display="flex"
      p={5}
      h="full"
      minH="12rem"
      rounded="lg"
      border="2px solid"
      borderColor="border"
      {...props}
    >
      {children}
    </Stack>
  );
};

const Header = ({ children, ...props }: React.PropsWithChildren<BoxProps>) => {
  return (
    <Box position="sticky" top="0" {...props}>
      <Heading fontSize="inherit" fontWeight="inherit">
        {children}
      </Heading>
    </Box>
  );
};

const Content = ({
  children,
  ...props
}: React.PropsWithChildren<StackProps>) => {
  return (
    <Stack h="full" w="full" {...props}>
      {children}
    </Stack>
  );
};

const LoadingState = () => {
  return (
    <Center h="full">
      <Spinner />
    </Center>
  );
};

const EmptyState = ({
  icon,
  primaryText,
  secondaryText,
  buttonConfig,
}: {
  icon?: IconType;
  primaryText: string;
  secondaryText?: string;
  buttonConfig?: {
    href: string;
    copy: string;
  };
}) => {
  return (
    <Stack flex="1" minH={0} justify="center" align="center" gap={2}>
      {icon && <Icon as={icon} size="lg" />}
      <VStack fontSize="sm" gap={0}>
        {primaryText}
        {secondaryText && (
          <Text fontSize="xs" color="fg.muted">
            {secondaryText}
          </Text>
        )}
      </VStack>
      {buttonConfig && (
        <Link href={buttonConfig.href} textDecorationLine="none">
          <ElevatedButton
            mt={4}
            size="sm"
            rounded="lg"
       surfaceColor="purple.400"
          shadowColor="purple.500"
            showShimmer
          >
            {buttonConfig.copy}
          </ElevatedButton>
        </Link>
      )}
    </Stack>
  );
};

Card.Header = Header;
Card.Content = Content;
Card.EmptyState = EmptyState;
Card.LoadingState = LoadingState;
