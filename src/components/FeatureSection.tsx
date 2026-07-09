import {
  Box,
  Container,
  Heading,
  Icon,
  SimpleGrid,
  VStack,
} from '@chakra-ui/react';
import { Card } from './Card';

import AudioBarsIcon from '@/assets/audio-bars.svg?component';
import GraphIcon from '@/assets/graph.svg?component';
import LevelsIcon from '@/assets/levels.svg?component';

const FEATURE_CARDS = [
  {
    heading: 'Four Exercise Types',
    description:
      'Practice intervals, chords, scales, and scale degrees with configurable question sets.',
    icon: AudioBarsIcon,
    key: 'types',
  },
  {
    heading: 'Customize Exercises',
    description: 'Choose question count, fixed root, auto-proceed, and more.',
    icon: LevelsIcon,
    key: 'customizable',
  },
  {
    heading: 'Track Your Progress',
    description:
      'Create a free account to save attempts, build streaks, and monitor improvement over time.',
    icon: GraphIcon,
    key: 'progress',
  },
];

export const FeatureSection = () => {
  return (
    <Box as="section" py={{ base: 4, md: 12 }}>
      <Container maxW="container.xl" px={{ base: 4, md: 8 }}>
        <VStack gap={{ base: 6, md: 8 }} alignItems="center">
          <Heading size="3xl" textAlign="center">
            Why EarTuner?
          </Heading>

          <SimpleGrid
            columns={{ base: 1, md: 3 }}
            gap={{ base: 4, md: 8 }}
            w="full"
          >
            {FEATURE_CARDS.map(({ description, key, heading, icon }) => (
              <Card
                key={key}
                p={{ base: 6, md: 8 }}
                align="center"
                justify="center"
                height="full"
                maxW="330px"
              >
                <Icon
                  as={icon}
                  boxSize={{ base: 12, md: 16 }}
                  mb={{ base: 4, md: 6 }}
                />

                <Card.Header
                  fontSize={{ base: 'md', md: 'xl' }}

                  textAlign="center"
                  mb={2}
                >
                  {heading}
                </Card.Header>

                <Card.Content
                  fontSize={{ base: 'xs', md: 'sm' }}
                  textAlign="center"
                >
                  {description}
                </Card.Content>
              </Card>
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
};
