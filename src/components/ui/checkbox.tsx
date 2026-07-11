import {
  Checkbox as ChakraCheckbox,
  Text,
  Stack,
  CheckboxRootProps,
} from "@chakra-ui/react";

/**
 * This component renders a reusable checkbox using Chakra's "Checkbox" primitive.
 */
export const Checkbox = ({
  checked,
  label,
  description,
  onCheckedChange,
  ...props
}: {
  checked: boolean;
  label: string;
  description?: string;
} & CheckboxRootProps) => {
  return (
    <ChakraCheckbox.Root
      checked={checked}
      onCheckedChange={onCheckedChange}
      mt={2}
      {...props}
    >
      <ChakraCheckbox.HiddenInput />
      <ChakraCheckbox.Control />
      <ChakraCheckbox.Label>
        <Stack direction="row" align="center" w="full">
          <Text fontWeight="normal" whiteSpace="nowrap">
            {label}
          </Text>
          {description && (
            <Text fontWeight="normal" fontSize="xs" color="fg.muted">
              {description}
            </Text>
          )}
        </Stack>
      </ChakraCheckbox.Label>
    </ChakraCheckbox.Root>
  );
};
