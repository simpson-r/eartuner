import { useMemo } from 'react';
import { Text, Stack, HStack, Box } from '@chakra-ui/react';
import { Card } from '@/components/Card';
import { Streak } from './ActivityWidget.style';
import { Stat } from '@/components/Stat';
import { useMeStats } from '@/hooks/use-me-stats';

const VISIBLE_DAYS = 5;
const MAX_ROLLBACK = 4;
const DAYS_OF_WEEK = ['Su', 'M', 'T', 'W', 'Th', 'F', 'S'];

type Streak = NonNullable<ReturnType<typeof useMeStats>['streak']>;

const STREAK_STATS: Array<{ label: string; key: keyof Streak }> = [
  { label: 'Max streak', key: 'longest' },
  { label: 'Last practice', key: 'lastDate' },
];

/**
 * This component displays the user'scurrent streak count and a visual calendar tracking streak progress.
 */
export const ActivityWidget = () => {
  const { streak, isLoadingMeStats } = useMeStats();
  const { current } = streak;

  const visibleDays = useMemo(() => {
    const day = new Date().getDay();

    return Array.from({ length: VISIBLE_DAYS }, (_, index) => {
      const rollback =
        (current || 0) > 1 ? Math.min(MAX_ROLLBACK, (current || 0) - 1) : 0;
      const dayIdx = (day - rollback + index + 7) % 7;
      const offset = index - rollback;

      return {
        label: DAYS_OF_WEEK[dayIdx],
        active: streak?.hasCompletedToday ? offset <= 0 : offset < 0,
        today: offset === 0,
      };
    });
  }, [current, streak?.hasCompletedToday]);

  return (
    <Card>
      <Card.Header fontSize={{ base: 'md', md: 'lg' }} fontWeight="bold">
        Streak
      </Card.Header>
      {isLoadingMeStats ? (
        <Card.LoadingState />
      ) : (
        <Card.Content
          w="full"
          h="full"
          gap={7}
        >
          <Text fontSize={{ base: 'xs', sm: 'sm' }} textAlign="center">
            Complete daily exercises to build your streak
          </Text>

          <HStack align="center" w="full" maxW="fit-content" mx="auto">
            {visibleDays.map((day, index) => (
              <Stack key={`${day.label}-${index}`} align="center" gap={1}>
                <Streak.Circle active={day.active} />
                <Text
                  color={day.today ? 'fg' : 'inherit'}
                  fontWeight={day.today ? 'bold' : 'normal'}
                  fontSize="xs"
                >
                  {day.label}
                </Text>
              </Stack>
            ))}
          </HStack>

          <Box minH="60px"  mt="auto" w="full">
            <Stat.Row items={STREAK_STATS} stats={streak} />
          </Box>
        </Card.Content>
      )}
    </Card>
  );
};
