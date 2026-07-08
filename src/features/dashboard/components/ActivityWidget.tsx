import { Fragment, useMemo } from 'react';
import { Text, Stack, HStack, Separator, Box } from '@chakra-ui/react';
import { Card } from '@/components/Card';
import { Streak } from './ActivityWidget.style';
import { useStreak } from '@/hooks/use-streak';
import { Stat } from '@/components/Stat';

const VISIBLE_DAYS = 5;
const MAX_ROLLBACK = 4;
const DAYS_OF_WEEK = ['Su', 'M', 'T', 'W', 'Th', 'F', 'S'];

type Streak = NonNullable<ReturnType<typeof useStreak>['streak']>;

const STREAK_STATS: Array<{ label: string; key: keyof Streak }> = [
  { label: 'Max streak', key: 'longest' },
  { label: 'Last practice', key: 'lastDate' },
];

/**
 * This component displays the user'scurrent streak count and a visual calendar tracking streak progress.
 */
export const ActivityWidget = () => {
  const { streak, isLoadingStreak } = useStreak();
  const { current } = streak;

  const visibleDays = useMemo(() => {
    const day = new Date().getDay();

    return Array.from({ length: VISIBLE_DAYS }, (_, index) => {
      const rollback = current > 1 ? Math.min(MAX_ROLLBACK, current - 1) : 0;
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
      <Card.Header fontSize="md" fontWeight="bold">
        Streak
      </Card.Header>
      {isLoadingStreak ? (
        <Card.LoadingState />
      ) : (
        <Card.Content
          w="full"
          h="full"
          justify={{ base: 'center', md: 'space-around' }}
        >
          {!current && (
            <Text fontSize="sm">
              Complete an exercise every day to build your streak
            </Text>
          )}

          <HStack
            w="full"
            flex={1}
            maxW="fit-content"
            mx="auto"
            justify="flex-start"
            align="center"
          >
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

          <Box minH="60px">
            <HStack borderRadius="md" bgColor="bg.muted" w="full" p={3}>
              {STREAK_STATS.map(({ label, key }, index) => (
                <Fragment key={key}>
                  {index > 0 && (
                    <Separator
                      orientation="vertical"
                      height="32px"
                      borderColor="border"
                    />
                  )}
                  <Stat
                    key={key}
                    label={label}
                    value={streak[key] as number | string}
                    justify="center"
                    align="center"
                    fontSize="xs"
                    flex={1}
                    gap={0}
                  />
                </Fragment>
              ))}
            </HStack>
          </Box>
        </Card.Content>
      )}
    </Card>
  );
};
