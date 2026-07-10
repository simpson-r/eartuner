'use client';

import { Fragment, useState } from 'react';
import {
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  Legend,
  Pie,
  PieChart as RechartsPieChart,
  Sector,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Chart, useChart } from '@chakra-ui/charts';

import {
  Box,
  createListCollection,
  HStack,
  Separator,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { ExerciseType } from '@prisma/client';

import { Card } from '@/components/Card';
import { Stat } from '@/components/Stat';
import { Dropdown } from '@/components/ui/dropdown';
import { EXERCISE_LABEL_CONFIG } from '@/config/exercises';

import { MeStatsResponse, useMeStats } from '@/hooks/use-me-stats';
import { SelectedBreakdownType } from '../types';
import { buildBreakdownMap, getChartRows } from '../utils';
import { formatScore } from '@/features/exercise/utils';

const CHART_HEIGHT = 140;
const STATS_SECTIONS: {
  label: string;
  key: keyof MeStatsResponse['summary'];
}[] = [
  { label: 'Sessions', key: 'attempts' },
  { label: 'Avg score', key: 'averageScore' },
];

const BREAKDOWN_OPTIONS = [
  { label: 'All', value: 'All' },
  { label: 'Intervals', value: ExerciseType.Interval },
  { label: 'Chords', value: ExerciseType.Chord },
  { label: 'Scales', value: ExerciseType.Scale },
  { label: 'Scale Degrees', value: ExerciseType.ScaleDegree },
];

const breakdownCollection = createListCollection({
  items: BREAKDOWN_OPTIONS,
});

/**
 * This component renders a list of stats to be displayed on the user's dashboard
 */
export const StatsWidget = () => {
  const { stats, questionAccuracyByType, isLoadingMeStats } = useMeStats();
  const [selectedType, setSelectedType] =
    useState<SelectedBreakdownType>('All');

  /**
   * DERIVED VARS
   */
  const breakdownMap = buildBreakdownMap(stats?.breakdownByType);

  const summaryStats =
    selectedType === 'All' ? stats?.summary : breakdownMap[selectedType];
  const showEmptyState = !stats?.breakdownByType.length;

  // filter out unplayed exercises
  const filteredItems = breakdownCollection.items.filter(
    (b) =>
      b.value === 'All' ||
      !!questionAccuracyByType?.[b.value as ExerciseType]?.length,
  );
  const filteredCollection = createListCollection({ items: filteredItems });

  /**
   * CHART DATA
   */
  const pieChart = useChart({
    data:
      stats?.breakdownByType?.map((breakdown) => ({
        name: EXERCISE_LABEL_CONFIG[breakdown.type].label,
        value: breakdown.attempts,
        color: EXERCISE_LABEL_CONFIG[breakdown.type].color,
      })) ?? [],
  });

  const barChart = useChart({
    data: getChartRows(questionAccuracyByType, selectedType),
    series: [{ name: 'accuracy', color: 'cobalt.400' }],
  });

  const chart = selectedType === 'All' ? pieChart : barChart;
  const hasStats = !showEmptyState;

  return (
    <Card>
      <Stack
        direction={{ base: 'column', sm: 'row' }}
        justify="space-between"
        align={{ base: 'flex-start', md: 'center' }}
      >
        <Card.Header fontSize="lg" fontWeight="bold">
          Your progress
        </Card.Header>
        <Dropdown
          collection={filteredCollection}
          value={[selectedType]}
          onValueChange={(event) =>
            setSelectedType(event.value[0] as SelectedBreakdownType)
          }
          size="xs"
          maxW={28}
        />
      </Stack>

      {isLoadingMeStats && <Card.LoadingState />}

      {!isLoadingMeStats && stats && (
        <VStack h="full">
          {showEmptyState && (
            <Text fontSize="sm" h="140px" alignContent="center">
              Complete your first exercise to unlock your progress
            </Text>
          )}

          {/* bar chart by exercise type */}
          <Box display="flex" w="full">
            {hasStats && selectedType !== 'All' && (
              <Chart.Root chart={barChart} aspectRatio="unset">
                <RechartsBarChart
                  data={barChart.data}
                  margin={{ top: 8, right: 0, bottom: 0, left: 0 }}
                  height={CHART_HEIGHT}
                  responsive
                >
                  <CartesianGrid
                    stroke={chart.color('border.muted')}
                    vertical={false}
                  />
                  <XAxis
                    dataKey={'expected'}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    width={40}
                    axisLine={false}
                    tickLine={false}
                    domain={[0, 100]}
                    tickFormatter={(value) => `${formatScore(value)}%`}
                  />

                  <Tooltip
                    cursor={{ fill: chart.color('bg.muted') }}
                    animationDuration={100}
                    content={<Chart.Tooltip />}
                  />

                  {chart.series.map((item) => (
                    <Bar
                      key={item.name}
                      dataKey={barChart.key('accuracy')}
                      fill={barChart.color(item.color)}
                      barSize={12}
                      radius={4}
                    />
                  ))}
                </RechartsBarChart>
              </Chart.Root>
            )}

            {/* pie chart summary */}
            {hasStats && selectedType === 'All' && (
              <Chart.Root chart={pieChart} aspectRatio="unset">
                <RechartsPieChart height={CHART_HEIGHT} responsive>
                  <Legend align="center" content={<Chart.Legend />} />

                  <Tooltip
                    cursor={false}
                    animationDuration={100}
                    content={<Chart.Tooltip hideLabel />}
                  />

                  <Pie
                    data={chart.data}
                    dataKey={pieChart.key('value')}
                    nameKey={pieChart.key('name')}
                    strokeWidth={0}
                    isAnimationActive
                    shape={(props) => (
                      <Sector
                        {...props}
                        fill={chart.color(props.payload!.color)}
                      />
                    )}
                  />
                </RechartsPieChart>
              </Chart.Root>
            )}
          </Box>

          {/* stats summary */}
          <HStack
            justify="space-between"
            bgColor="bg.muted"
            borderRadius="md"
            w="full"
            display={{ base: 'none', md: 'flex' }}
            p={3}
          >
            {STATS_SECTIONS.map(({ label, key }, index) => (
              <Fragment key={key}>
                {index > 0 && (
                  <Separator
                    orientation="vertical"
                    height="32px"
                    borderColor="border"
                    pt={{ base: '8px' }}
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
                    summaryStats?.[key as 'attempts' | 'averageScore'] || '--'
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
