import {
  Box,
  Flex,
  Heading,
  HStack,
  Separator,
  Stack,
  Text,
} from '@chakra-ui/react';

import SparkIcon from '@/assets/spark.svg?component';
import TrophyIcon from '@/assets/trophy.svg?component';
import { getPerformanceCTA, timeFormat } from '../utils';
import { Stat } from '@/components/Stat';
import { Fragment, useMemo } from 'react';
import { ElevatedButton } from '@/components/ElevatedButton';
import { ExercisePlayerState } from '../hooks/use-exercise-player';
import { useRouter } from 'next/navigation';

const ICON_SIZE = 80;
const MAIN_ICON_SIZE = 240;

/**
 * This renders the post-exercise summary once the user finishes a training session.
 */
export const CompletionScreen = ({
  state,
  isLoggedIn,
}: {
  state: ExercisePlayerState;
  isLoggedIn: boolean;
}) => {
  const router = useRouter();
  const score = ((state.correct * 1.0) / state.total) * 100;
  const cta = getPerformanceCTA(score);

  const statsToDisplay = useMemo(() => {
    const roundedScore = Math.round(score * 100) / 100;
    return [
      { label: 'Score', value: `${roundedScore}%` },
      { label: 'Questions', value: state.total },
      { label: 'Time', value: timeFormat(state.duration || 0) },
    ];
  }, [score, state]);

  const firework = (
    <Box animation="shake 1s ease-in-out infinite">
      <SparkIcon width={ICON_SIZE} height={ICON_SIZE} />
    </Box>
  );

  const handleLoginClick = () => router.replace('/login');
  const handleContinueClick = () => router.replace('/');

  return (
    <Flex direction="column" align="center" justify="center" gap={4} py={6}>
      {/* hero svg */}
      <Stack direction="row" align="center" gap={8}>
        {firework}
        <Box animation="scaleUp 500ms cubic-bezier(0.34, 1.56, 0.64, 1)">
          <TrophyIcon width={MAIN_ICON_SIZE} height={MAIN_ICON_SIZE} />
        </Box>
        {firework}
      </Stack>

      {/* success message */}
      <Stack gap={2} align="center" justify="center">
        <Heading size="2xl" fontWeight="bold">
          Practice Complete
        </Heading>
        <Text>{cta}</Text>
      </Stack>

      {/* stats */}
      <HStack
        w="7/12"
        align="center"
        gap={2}
        justifyContent={{ base: 'center', md: 'space-between' }}
        bgColor="bg"
        rounded="2xl"
        p={6}
      >
        {statsToDisplay.map(({ label, value }, index) => (
          <Fragment key={label}>
            {index > 0 && (
              <Separator
                orientation="vertical"
                height="32px"
                borderColor="border"
              />
            )}
            <Stat key={label} label={label} value={value} gap={0} />
          </Fragment>
        ))}
      </HStack>

      {/* sign up cta */}
      {!isLoggedIn && (
        <Stack
          direction={{ base: 'column', md: 'row' }}
          gap={{ base: 4, md: 8 }}
        >
          <ElevatedButton
            size="lg"
            variant="subtle"
            rounded="2xl"
            border="1px solid"
            onClick={handleContinueClick}
          >
            Back to exercises
          </ElevatedButton>
          <ElevatedButton
            size="lg"
            rounded="2xl"
            surfaceColor="purple.400"
            shadowColor="purple.500"
            color="fg.inverted"
            onClick={handleLoginClick}
          >
            Create account
          </ElevatedButton>
        </Stack>
      )}
    </Flex>
  );
};
