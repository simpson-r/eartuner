import { Heading, Stack, SystemStyleObject, Text } from "@chakra-ui/react";

export const PageHeader = ({
  header,
  description,
  align = "flex-start",
}: {
  header: React.ReactElement | string;
  description: React.ReactElement | string;
  align?: SystemStyleObject["alignItems"];
}) => (
  <Stack align={align} gap={2}>
    <Heading fontSize="3xl">{header}</Heading>
    <Text fontSize="sm">{description}</Text>
  </Stack>
);
