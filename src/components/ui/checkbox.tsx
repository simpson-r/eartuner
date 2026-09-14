import {
  Checkbox as ChakraCheckbox,
  CheckboxRootProps,
  Stack,
  Text,
} from '@chakra-ui/react';

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
      {...props}
    >
      <ChakraCheckbox.HiddenInput />
      <ChakraCheckbox.Control flexShrink={0} />
      <ChakraCheckbox.Label>
        <Stack
          direction={{ base: 'column', md: 'row' }}
          align={{ base: 'flex-start', md: 'baseline' }}
          gap={{ base: 0, md: 2 }}
        >
          <Text fontSize="xs" whiteSpace="nowrap">
            {label}
          </Text>
          {description && (
            <Text fontSize="2xs" color="fg.subtle" lineHeight="1.1">
              {description}
            </Text>
          )}
        </Stack>
      </ChakraCheckbox.Label>
    </ChakraCheckbox.Root>
  );
};
