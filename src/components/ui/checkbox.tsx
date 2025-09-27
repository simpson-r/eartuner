import { Checkbox as ChakraCheckbox, Text, Stack } from "@chakra-ui/react";

/**
 * This component renders a reusable checkbox using Chakra's "Checkbox" primitive.
 */
export const Checkbox = ({
  checked,
  label,
  description,
  onCheckedChange,
}: {
  checked: boolean;
  label: string;
  description?: string;
  onCheckedChange: (checked: boolean) => void;
}) => {
  return (
    <ChakraCheckbox.Root
      checked={checked}
      onCheckedChange={(details) => {
        onCheckedChange(!!details.checked);
      }}
    >
      <ChakraCheckbox.HiddenInput />
      <ChakraCheckbox.Control />
      <ChakraCheckbox.Label>
        <Stack direction="row" align="center" w="100%">
          <Text fontWeight="normal" whiteSpace="nowrap">
            {label}
          </Text>
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
