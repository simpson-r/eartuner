import { ListCollection, Select } from '@chakra-ui/react';

/**
 * This component renders a reusable dropdown using Chakra's "Select" primitive.
 */
export const Dropdown = ({
  collection,
  label,
  placeholder,
  size = 'sm',
  value,
  onValueChange,
}: {
  collection: ListCollection;
  label: string;
  placeholder?: string;
  size?: 'sm' | 'md' | 'lg' | 'xs';
  value: string;
  onValueChange: (val: string) => void;
}) => {
  return (
    <Select.Root
      size={size}
      collection={collection}
      value={[value]}
      onValueChange={(e) => onValueChange(e.value[0])}
    >
      <Select.HiddenSelect />
      <Select.Label as="h2">{label}</Select.Label>
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
