'use client';

import { Button, Dialog, Text, VStack } from '@chakra-ui/react';

import { ElevatedButton } from '@/components/ElevatedButton';

interface CTAConfig {
  heading: string;
  body: string;
  cancelText: string;
  confirmText: string;
}
/**
 * This component displays a modal that confirms whether the user wants to proceed with a specific action
 */
export const ConfirmationModal = ({
  ctaConfig: { heading, body, cancelText, confirmText },
  isOpen,
  isLoading = false,
  onClose,
  onConfirm,
}: {
  ctaConfig: CTAConfig;
  isOpen: boolean;
  isLoading?: boolean;
  onClose: VoidFunction;
  onConfirm: VoidFunction;
}) => {
  return (
    <Dialog.Root
      placement="center"
      open={isOpen}
      lazyMount
      unmountOnExit
      onEscapeKeyDown={onClose}
    >
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content
          rounded="2xl"
          justifyContent="center"
          alignItems="center"
          bgColor="bg.subtle"
          maxW={350}
        >
          <Dialog.Header>
            <Dialog.Title fontSize="xl" textAlign="center">
              {heading}
            </Dialog.Title>
          </Dialog.Header>

          <Dialog.Body>
            <Text color="fg" textAlign="center">
              {body}
            </Text>
          </Dialog.Body>

          <Dialog.Footer w="full">
            <VStack w="full" gap={4}>
              <ElevatedButton
                w="full"
                color="fg.inverted"
                surfaceColor="gray.fg"
                shadowColor="gray.solid"
                onClick={onClose}
              >
                {cancelText}
              </ElevatedButton>
              <Button
                w="full"
                rounded="2xl"
                variant="ghost"
                colorPalette="red"
                onClick={onConfirm}
                loading={isLoading}
              >
                {confirmText}
              </Button>
            </VStack>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
};
