import React from "react";

import {
  Box,
  Button,
  Center,
  Container,
  Heading,
  Icon,
  Link,
  Spinner,
  Stack,
  Text,
  type StackProps,
} from "@chakra-ui/react";

import { IconType } from "react-icons/lib";

/**
 * This component renders a pure functional "Card" component that houses widget-like lists within the dashboard
 */
export const Card = ({
  children,
  ...props
}: React.PropsWithChildren<StackProps>) => {
  return (
    <Stack
      p={6}
      h="full"
      minH="16rem"
      rounded="lg"
      border="1px solid"
      borderColor="border"
      {...props}
    >
      {children}
    </Stack>
  );
};

const Header = ({ children }: React.PropsWithChildren) => {
  return (
    <Box position="sticky" top="0" background="bg" h={8}>
      <Heading fontSize="xl">{children}</Heading>
      <Box w="100%" h="1px" bgColor="border" />
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
    <Container
      h="full"
      w="full"
      margin="auto"
      justifyContent="center"
      centerContent
    >
      {icon && <Icon as={icon} size="lg" color="fg" />}
      <Text fontSize="sm">{primaryText}</Text>
      {secondaryText && (
        <Text fontSize="xs" color="gray.500">
          {secondaryText}
        </Text>
      )}
      {buttonConfig && (
        <Link href={buttonConfig.href} textDecorationLine="none">
          <Button
            mt={4}
            size="sm"
            rounded="lg"
            bgColor="cobalt.500"
            _hover={{ bgColor: "cobalt.600" }}
          >
            {buttonConfig.copy}
          </Button>
        </Link>
      )}
    </Container>
  );
};

Card.Header = Header;
Card.Content = Content;
Card.EmptyState = EmptyState;
Card.LoadingState = LoadingState;
