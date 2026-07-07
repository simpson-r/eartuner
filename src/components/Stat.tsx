import { StackProps, Text, VStack } from '@chakra-ui/react';

/**
 * This component renders a reusable vertically aligned stat followed by its corresponding label
 */
export const Stat = ({
  label,
  value,
  ...props
}: {
  label: string;
  value: string | number;
} & StackProps) => {
  return (
    <VStack {...props}>
      <Text color="fg" fontWeight="bold">
        {value || '--'}
      </Text>
      <Text fontSize="xs">{label}</Text>
    </VStack>
  );
};
