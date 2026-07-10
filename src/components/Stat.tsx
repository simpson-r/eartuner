import { Fragment } from 'react';

import { HStack, Separator, StackProps, Text, VStack } from '@chakra-ui/react';
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

export const StatRow = ({
  items,
  stats,
  ...props
}: {
  stats: any;
  items: { label: string; key: string }[];
} & StackProps) => {
  return (
    <HStack
      justify="space-between"
      bgColor="bg.muted"
      borderRadius="md"
      w="full"
      p={3}
      {...props}
    >
      {items.map(({ label, key }, index) => (
        <Fragment key={key}>
          {index > 0 && (
            <Separator
              orientation="vertical"
              height="30px"
              borderColor="border"
              pt={{ base: '8px' }}
            />
          )}
          <Stat
            key={key}
            label={label}
            fontSize="xs"
            justify="center"
            align="center"
            gap={0}
            truncate={{ base: true, sm: false }}
            flex={1}
            value={stats?.[key] || '--'}
          />
        </Fragment>
      ))}
    </HStack>
  );
};

Stat.Row = StatRow;
