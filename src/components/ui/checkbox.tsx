import { Checkbox as ChakraCheckbox, Text, Stack } from "@chakra-ui/react";

/**
 * This component renders a reusable checkbox using Chakra's "Checkbox" primitive.
 */
export const Checkbox = ({
  label,
  description,
}: {
  label: string;
  description?: string;
}) => {
  return (
    <ChakraCheckbox.Root>
      <ChakraCheckbox.HiddenInput />
      <ChakraCheckbox.Control />
      <ChakraCheckbox.Label>
        <Stack direction="row" alignItems="center" w="100%">
          <Text fontWeight="normal" whiteSpace="nowrap">{label}</Text>
          {description && (
            <Text fontWeight="normal" fontSize="xs" color="gray.500">
              {description}
            </Text>
          )}
        </Stack>
      </ChakraCheckbox.Label>
    </ChakraCheckbox.Root>
  );
};
