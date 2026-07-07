import { useMemo } from 'react';

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

export const PlayerFooter = ({
  answer,
  correct,
  finished = false,
  onContinueClick,
}: {
  answer: string | null;
  finished?: boolean;
  correct: boolean;
  onContinueClick: VoidFunction;
}) => {
  const sx = responseSx[correct || finished ? 'success' : 'error'];

  const feedback = useMemo(
    () => getAnswerFeedback(correct, answer || ''),
    [correct, answer],
  );

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
        w={{ base: '5/6', md: '1/2' }}
        align="center"
        justify={finished ? 'center' : 'space-between'}
        gap={{ base: 12 }}
      >
        {/* response feedback */}
        {!finished && (
          <Stack direction="row" align="center" gap={4}>
            {correct ? (
              <Icon as={CheckIcon} boxSize={ICON_SIZE} />
            ) : (
              <Icon as={CrossMarkIcon} boxSize={ICON_SIZE} />
            )}
            {/* feedback message */}
            <Stack direction="column" alignItems="flex-start" gap={0}>
              <Heading size={{ base: 'lg', md: 'xl' }} fontWeight="bold">
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
        >
          Continue
        </ElevatedButton>
      </HStack>
    </Container>
  );
};
