import { useMemo } from 'react';

import {
  Flex,
  Heading,
  Icon,
  SimpleGrid,
  Stack,
  VStack,
} from '@chakra-ui/react';
import { FaPlay } from 'react-icons/fa';

import { ElevatedButton } from '@/components/ElevatedButton';
import { Question } from '@/utils/types';
import { responseSx } from '../style';

export const PlayerScreen = ({
  answered,
  correct,
  options,
  playing,
  question,
  handlePlayClick,
  handleResponseClick,
}: {
  answered: boolean;
  correct: boolean;
  options: { label: string; value: string }[];
  playing: boolean;
  question?: Question;
  handlePlayClick: VoidFunction;
  handleResponseClick: (response: string) => void;
}) => {
  const gridCols = useMemo(
    () => Math.max(2, Math.floor(options.length / 4)),
    [options],
  );

  const sx = responseSx[correct ? 'success' : 'error'];

  return (
    <Flex flex="1" w="full" h="full" justify="center" align="center">
      <Flex
        direction="column"
        align={{ base: 'center', md: 'normal' }}
        gap={{ base: 10, md: 24 }}
        maxW="720px"
        w="full"
        h="5/6"
      >
        <Heading size="2xl" textAlign="left">
          What do you hear?
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
              icon={<Icon as={FaPlay} boxSize={20} />}
              disabled={playing}
              onClick={handlePlayClick}
              boxSize="180px"
              surfaceColor="cyan.focusRing"
              shadowColor="cyan.solid"
              rounded="4xl"
            />
            {/* <Text fontSize="sm">Click to play</Text> */}
          </VStack>

          {/* answer options */}
          <SimpleGrid
            templateColumns={{
              base: 'repeat(2, 1fr)',
              md: `repeat(${gridCols}, 1fr)`,
            }}
            maxW="xl"
            w="9/12"
            gap={4}
          >
            {options.map((opt: { label: string; value: string }) => {
              const selected = answered && question?.selected === opt.value;
              return (
                <ElevatedButton
                  key={opt.value}
                  fontSize="sm"
                  w="full"
                  minH={12}
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
                </ElevatedButton>
              );
            })}
          </SimpleGrid>
        </Stack>
      </Flex>
    </Flex>
  );
};
