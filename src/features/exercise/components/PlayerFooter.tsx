import { Container, Heading, HStack, Stack, Text } from '@chakra-ui/react';

import CheckIcon from '@/assets/check.svg?component';
import CrossMarkIcon from '@/assets/cross-mark.svg?component';
import { responseSx } from '../style';
import { getAnswerFeedback } from '../utils';
import { ElevatedButton } from '@/components/ElevatedButton';

export const PlayerFooter = ({
  answer,
  answered = false,
  correct,
  finished = false,
  onContinueClick,
}: {
  answer: string | null;
  answered?: boolean;
  finished?: boolean;
  correct: boolean;
  onContinueClick: VoidFunction;
}) => {
  const sx = responseSx[correct || finished ? 'success' : 'error'];
  const feedback = getAnswerFeedback(correct, answer || '');
  const iconSize = correct ? 60 : 50;

  if (!answered && !finished) return null;

  return (
    <Container
      as={Stack}
      flexDirection="row"
      alignItems="space-between"
      justifyContent="center"
      borderTop="2px solid"
      borderColor="border"
      bgColor="bg.panel"
      w="full"
      h="full"
      minH={32}
      gap={6}
      py={4}
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
              <CheckIcon width={iconSize} height={iconSize} />
            ) : (
              <CrossMarkIcon width={iconSize} height={iconSize} />
            )}
            {/* feedback message */}
            <Stack direction="column" alignItems="flex-start" gap={0}>
              <Heading size="2xl" fontWeight="bold">
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
          w={finished ? '20rem' : '10rem'}
          onClick={onContinueClick}
          surfaceColor={finished ? 'purple.400' : sx.button.solid.bgColor}
          shadowColor={finished ? 'purple.500' : sx.button.solid.borderColor}
        >
          Continue
        </ElevatedButton>
      </HStack>
    </Container>
  );
};
