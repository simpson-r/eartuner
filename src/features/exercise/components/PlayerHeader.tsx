import { useRouter } from 'next/navigation';

import { HiX } from 'react-icons/hi';

import {
  Button,
  HStack,
  Icon,
  Progress,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

import { ConfirmationModal } from '../../../components/ConfirmationModal';

export const PlayerHeader = ({
  progress,
  curQuestion,
  totalQuestions,
}: {
  curQuestion: number;
  progress: number;
  totalQuestions: number;
}) => {
  const router = useRouter();
  const {
    open: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();

  const handleExit = () => router.push('/');

  return (
    <HStack justifyContent="space-between" align="center" minH="70px" px={28}>
      {/* exit button */}
      <Button variant="ghost" size="sm" onClick={onModalOpen} asChild>
        <Icon as={HiX} boxSize={14} color="fg.muted" />
      </Button>
      {/* progress bar */}
      <Progress.Root
        w="7/12"
        shape="full"
        size="lg"
        colorPalette="green"
        value={progress}
        striped
      >
        <Progress.Track>
          <Progress.Range />
        </Progress.Track>
      </Progress.Root>
      {/* cur / total */}
      <Text fontWeight="bold" color="fg.muted">
        {curQuestion}/{totalQuestions}
      </Text>
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={onModalClose}
        onConfirm={handleExit}
        ctaConfig={{
          heading: 'Are you sure?',
          body: 'If you quit, you will lose your progress.',
          cancelText: 'Keep practicing',
          confirmText: 'Quit',
        }}
      />
    </HStack>
  );
};
