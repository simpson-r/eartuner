import { Box, Heading, Stack } from "@chakra-ui/react";

/**
 * This component renders a pure functional "Card" component that houses widget-like lists within the dashboard
 */
export const Card = ({
  children,
  title,
}: React.PropsWithChildren<{ title: React.ReactNode }>) => {
  return (
    <Stack
      h="100%"
      minH="16rem"
      p={8}
      rounded="xl"
      border="1px solid"
      borderColor="border.emphasized"
    >
      <Heading fontSize="xl">{title}</Heading>
      <Box w="100%" h="1px" bgColor="border" />
      {children}
    </Stack>
  );
};

const Placeholder = ({ placeholder }: { placeholder: React.ReactNode }) => {
  return (
    <Stack
      textAlign="center"
      margin="auto"
      justifyContent="center"
      h="100%"
      w="100%"
    >
      {placeholder}
    </Stack>
  );
};

Card.Placeholder = Placeholder;
