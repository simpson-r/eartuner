import { useEffect, useMemo } from 'react';
import { FaPlay } from 'react-icons/fa';

import {
  Flex,
  Heading,
  Icon,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { ExerciseType } from '@prisma/client';

import { ElevatedButton } from '@/components/ElevatedButton';
import { responseSx } from '@/features/exercise/style';
import { Question } from '@/features/exercise/types';
import { EXERCISE_NAME_MAP } from '@/utils/constants';

const ICON_BOX_SIZE = 20;
const ICON_BOX_SIZE_SM = 12;
const OPTION_SHORTCUTS = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  'q',
  'w',
  'e',
  'r',
  't',
  'y',
] as const;

export const PlayerScreen = ({
  exerciseType,
  answered,
  correct,
  options,
  enablePlayButton,
  question,
  showShortcuts = false,
  handlePlayClick,
  handleResponseClick,
}: {
  exerciseType: ExerciseType;
  answered: boolean;
  correct: boolean;
  options: { label: string; value: string }[];
  enablePlayButton: boolean;
  question?: Question;
  showShortcuts?: boolean;
  handlePlayClick: VoidFunction;
  handleResponseClick: (response: string) => void;
}) => {
  const gridCols = useMemo(
    () => Math.max(2, Math.floor(options.length / 4)),
    [options],
  );

  const sx = responseSx[correct ? 'success' : 'error'];

  const handleKeyPress = (e: KeyboardEvent) => {
    e.preventDefault();

    if (e.code === 'Space') {
      handlePlayClick();
      return;
    }

    options.forEach((opt, idx) => {
      if (e.key === OPTION_SHORTCUTS[idx]) {
        handleResponseClick(opt.value);
        return;
      }
    });
  };

  useEffect(() => {
    if (!showShortcuts) return;
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <Flex flex="1" w="full" h="full" justify="center" align="center">
      <Flex
        direction="column"
        align={{ base: 'center', md: 'flex-start' }}
        gap={{ base: 10, md: 24 }}
        maxW="720px"
        w="full"
      >
        <Heading size="2xl" textAlign="left">
          {`Which ${EXERCISE_NAME_MAP[exerciseType]} do you hear?`}
        </Heading>

        <Stack
          w="full"
          align={{ base: 'center', md: 'flex-start' }}
          direction={{ base: 'column', md: 'row' }}
          gap={{ base: 10, md: 8 }}
        >
          <VStack gap={6}>
            <ElevatedButton
              aria-label="Play interval"
              icon={
                <Icon
                  as={FaPlay}
                  boxSize={{ base: ICON_BOX_SIZE_SM, md: ICON_BOX_SIZE }}
                />
              }
              disabled={!enablePlayButton}
              onClick={handlePlayClick}
              boxSize={{ base: '120px', md: '180px' }}
              surfaceColor="cobalt.500"
              shadowColor="cobalt.600"
              rounded="4xl"
            />
          </VStack>

          {/* answer options grid */}
          <SimpleGrid
            templateColumns={{
              base: 'repeat(2, 1fr)',
              md: `repeat(${gridCols}, 1fr)`,
            }}
            maxW="xl"
            w="9/12"
            gap={4}
          >
            {options.map((opt: { label: string; value: string }, idx) => {
              const selected = answered && question?.selected === opt.value;
              return (
                <ElevatedButton
                  key={opt.value}
                  fontSize="sm"
                  w="full"
                  minH={options.length > 8 ? 10 : 12}
                  onClick={() => handleResponseClick(opt.value)}
                  disabled={(answered && !selected) || false}
                  borderWidth="1.8px"
                  borderColor="bg.emphasized"
                  borderRadius="lg"
                  variant={selected ? undefined : 'outline'}
                  shadowColor={
                    selected ? sx.button.solid.borderColor : undefined
                  }
                  color={selected ? sx.button.solid.borderColor : 'fg'}
                  {...(selected && sx.button.selected)}
                >
                  {opt.label}
                  {showShortcuts && (
                    <Text
                      fontSize="xs"
                      textAlign="right"
                    >{`[${OPTION_SHORTCUTS[idx]}]`}</Text>
                  )}
                </ElevatedButton>
              );
            })}
          </SimpleGrid>
        </Stack>
      </Flex>
    </Flex>
  );
};
