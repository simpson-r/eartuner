import { useEffect, useMemo } from 'react';

import {
  Container,
  Heading,
  HStack,
  Icon,
  Stack,
  Text,
} from '@chakra-ui/react';

import CheckIcon from '@/assets/check.svg?component';
import CrossMarkIcon from '@/assets/cross-mark.svg?component';
import { responseSx } from '../style';
import { getAnswerFeedback } from '../utils';
import { ElevatedButton } from '@/components/ElevatedButton';

const ICON_SIZE = 12;
const ICON_SIZE_SM = 10;

export const PlayerFooter = ({
  answer,
  autoProceed,
  secsRemaining,
  correct,
  showShortcuts,
  finished = false,
  onContinueClick,
}: {
  answer: string | null;
  autoProceed?: boolean;
  secsRemaining?: number;
  finished?: boolean;
  correct: boolean;
  showShortcuts?: boolean;
  onContinueClick: VoidFunction;
}) => {
  const sx = responseSx[correct || finished ? 'success' : 'error'];
  const btnCTA =
    autoProceed && !finished
      ? `Next in ${secsRemaining}...`
      : `Continue ${showShortcuts ? '↵' : ''}`;
  const feedback = useMemo(
    () => getAnswerFeedback(correct, answer || ''),
    [correct, answer],
  );

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.code !== 'Enter') return;

    e.preventDefault();
    onContinueClick();
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress, false);
    return () => {
      document.removeEventListener('keydown', handleKeyPress, false);
    };
  }, []);

  return (
    <Container
      as={Stack}
      flexDirection="row"
      alignItems="space-between"
      justifyContent="center"
      borderTop="1px solid"
      borderColor="border"
      bgColor="bg.panel"
      w="full"
      h="full"
    >
      <HStack
        w={{ base: 'full', md: '7/12' }}
        align="center"
        justify={finished ? 'center' : 'space-between'}
        gap={{ base: 12 }}
        h="full"
      >
        {/* response feedback */}
        {!finished && (
          <Stack direction="row" align="center" gap={3}>
            {correct ? (
              <Icon
                as={CheckIcon}
                boxSize={{ base: ICON_SIZE_SM, md: ICON_SIZE }}
              />
            ) : (
              <Icon
                as={CrossMarkIcon}
                boxSize={{ base: ICON_SIZE_SM, md: ICON_SIZE }}
              />
            )}
            {/* feedback message */}
            <Stack direction="column" alignItems="flex-start" gap={0}>
              <Heading size={{ base: 'md', md: 'xl' }} fontWeight="bold">
                {feedback.heading}
              </Heading>
              <Text fontSize="xs" color="fg">
                {feedback.description}
              </Text>
            </Stack>
          </Stack>
        )}
        {/* continue button */}
        <ElevatedButton
          size="xl"
          w={{ base: '7rem', md: finished ? '20rem' : '10rem' }}
          onClick={onContinueClick}
          surfaceColor={finished ? 'cobalt.500' : sx.button.solid.bgColor}
          shadowColor={finished ? 'cobalt.600' : sx.button.solid.borderColor}
          alignItems="center"
        >
          {btnCTA}
        </ElevatedButton>
      </HStack>
    </Container>
  );
};
