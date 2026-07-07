import {
  Field,
  Heading,
  SegmentGroup,
  SegmentGroupItemsProps,
  SegmentGroupRootProps,
  Switch,
  SwitchRootProps,
  VStack,
} from '@chakra-ui/react';

export const Section = ({
  children,
  label,
  ...props
}: React.PropsWithChildren<{ label: string }>) => {
  return (
    <VStack w="full" align="flex-start" gap={4} {...props}>
      <Heading fontWeight="bold">{label}</Heading>
      {children}
    </VStack>
  );
};

export const LeftAlignedSwitch = ({
  label,
  ...props
}: { label: React.ReactNode } & SwitchRootProps) => {
  return (
    <Switch.Root
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      w="full"
      size="lg"
      {...props}
    >
      <Switch.Label fontWeight="normal">{label}</Switch.Label>
      <Switch.HiddenInput />
      <Switch.Control />
    </Switch.Root>
  );
};

export const LeftAlignedSegment = ({
  label,
  items,
  ...props
}: {
  label: React.ReactNode;
  items: SegmentGroupItemsProps['items'];
} & SegmentGroupRootProps) => {
  return (
    <Field.Root
      display="flex"
      flexDirection={{ base: 'column', md: 'row' }}
      justifyContent="space-between"
      alignItems={{ base: 'flex-start', md: 'center' }}
      w="full"
      orientation="vertical"
      color="fg"
    >
      <Field.Label fontWeight="normal">{label}</Field.Label>
      <SegmentGroup.Root
        rounded="3xl"
        size={{ base: 'xs', md: 'sm' }}
        p={1}
        {...props}
      >
        <SegmentGroup.Indicator rounded="3xl" boxShadow="none" top={1} />
        <SegmentGroup.Items items={items} cursor="pointer" />
      </SegmentGroup.Root>
    </Field.Root>
  );
};
