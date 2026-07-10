import { Select, SelectRootProps } from '@chakra-ui/react';

/**
 * This component renders a reusable dropdown using Chakra's "Select" primitive.
 */
export const Dropdown = ({
  label,
  placeholder,
  collection,
  ...props
}: {
  label?: string;
  placeholder?: string;
} & SelectRootProps) => {
  return (
    <Select.Root collection={collection} {...props}>
      <Select.HiddenSelect />
      {label && <Select.Label as="h2">{label}</Select.Label>}
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder={placeholder} />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      {/* dropdown list */}
      <Select.Positioner>
        <Select.Content>
          {collection.items.map((item) => (
            <Select.Item item={item} key={item.value}>
              {item.label}
              <Select.ItemIndicator />
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Positioner>
    </Select.Root>
  );
};
