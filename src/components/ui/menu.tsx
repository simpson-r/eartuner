import {
  Menu as ChakraMenu,
  Icon,
  ListCollection,
  Portal,
} from "@chakra-ui/react";

/**
 * This component renders a reusable menu using Chakra's "Menu" primitive.
 */
export const Menu = ({
  children,
  items,
  isOpen,
  onPointerDownOutside,
  onSelect,
}: React.PropsWithChildren<{
  items: ListCollection;
  isOpen: boolean;
  onPointerDownOutside: VoidFunction;
  onSelect: (value: string) => void;
}>) => {
  return (
    <ChakraMenu.Root
      open={isOpen}
      positioning={{ placement: "top-start" }} // TODO: pass placement prop value
      onPointerDownOutside={onPointerDownOutside}
      lazyMount
    >
      <ChakraMenu.Trigger asChild>{children}</ChakraMenu.Trigger>
      <Portal>
        <ChakraMenu.Positioner>
          <ChakraMenu.Content divideY="1px" rounded="md" p={2}>
            {items.items.map((item) => (
              <ChakraMenu.Item
                key={item.value}
                value={item.value}
                color={item.color ?? "fg"}
                cursor="pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect(item.value);
                }}
              >
                {item.icon && <Icon as={item.icon} />}
                {item.label}
              </ChakraMenu.Item>
            ))}
          </ChakraMenu.Content>
        </ChakraMenu.Positioner>
      </Portal>
    </ChakraMenu.Root>
  );
};
