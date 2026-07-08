'use client';

import { Legend, Pie, PieChart, Sector, Tooltip } from 'recharts';

import { Chart, useChart } from '@chakra-ui/charts';

import { Card } from '@/components/Card';
import { BreakdownByType, StatsResponse, useStats } from '@/hooks/use-stats';
import { HStack, Separator, Text, VStack } from '@chakra-ui/react';
import { Stat } from '@/components/Stat';
import { formatDuration } from '@/features/exercise/utils';
import { Fragment } from 'react';
import {  EXERCISE_LABEL_CONFIG } from '@/config/exercises';

const STATS_MAP: {
  label: string;
  key: keyof StatsResponse['summary'];
}[] = [
  { label: 'Sessions', key: 'totalAttempts' },
  { label: 'Avg score', key: 'averageScore' },
  { label: 'Total time', key: 'totalDuration' },
];

/**
 * This component renders a list of stats to be displayed on the user's dashboard
 */
export const StatsWidget = () => {
  const { stats, isLoadingStats } = useStats();

  const showEmptyStateCTA = !stats?.breakdownByType.length;
  const chart = useChart({
    data:
      stats?.breakdownByType?.map((breakdown: BreakdownByType) => {
        return {
          name: EXERCISE_LABEL_CONFIG[breakdown.type].label,
          value: breakdown.attempts,
          color: `${EXERCISE_LABEL_CONFIG[breakdown.type].color}`,
        };
      }) ?? [],
  });

  return (
    <Card>
      <Card.Header fontSize="md" fontWeight="bold">
        Your progress
      </Card.Header>

      {isLoadingStats && <Card.LoadingState />}

      {!isLoadingStats && stats && (
        <VStack h="full">
          {/* pie chart  */}
          {showEmptyStateCTA ? (
            <Text fontSize="sm" h="140px" alignContent="center">Complete your first exercise to unlock your progress</Text>
          ) : (
            <Chart.Root
              chart={chart}
              w="full"
              maxH={{ sm: 'full', md: '100px' }}
            >
              <PieChart responsive>
                <Legend align="center" content={<Chart.Legend />} />

                <Tooltip
                  cursor={false}
                  animationDuration={100}
                  content={<Chart.Tooltip hideLabel />}
                />
                <Pie
                  strokeWidth={0}
                  isAnimationActive={true}
                  data={chart.data}
                  dataKey={chart.key('value')}
                  nameKey={chart.key('name')}
                  shape={(props) => (
                    <Sector
                      {...props}
                      fill={chart.color(props.payload!.color)}
                    />
                  )}
                />
              </PieChart>
            </Chart.Root>
          )}
          {/* stats summary */}
          <HStack
            justify="space-between"
            bgColor="bg.muted"
            borderRadius="md"
            w="full"
            display={{ sm: 'none', md: 'flex' }}
            p={4}
          >
            {STATS_MAP.map(({ label, key }, index) => (
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
                  fontSize="xs"
                  justify="center"
                  align="center"
                  gap={0}
                  flex={1}
                  value={
                    key === 'totalDuration'
                      ? formatDuration(stats?.summary[key])
                      : stats?.summary[key]
                  }
                />
              </Fragment>
            ))}
          </HStack>
        </VStack>
      )}
    </Card>
  );
};
