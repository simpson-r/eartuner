import {
  Flex,
  Heading,
  Icon,
  SimpleGrid,
  SimpleGridProps,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { ExerciseType } from '@prisma/client';

import { EXERCISE_TYPE_CONFIG } from '@/config/exercises';
import { ElevatedButton } from '@/components/ElevatedButton';
import { NewExerciseModal } from '@/features/dashboard/components/NewExerciseModal';
import { useState } from 'react';

/**
 * This component renders a grid of exercises to be displayed on the landing and dashboard page
 */
export const ExerciseWidget = ({ ...props }: SimpleGridProps) => {
  const [exerciseType, setExerciseType] = useState<ExerciseType>(
    ExerciseType.Interval,
  );
  const { open, onClose, onOpen } = useDisclosure();

  const handleExerciseClick = (type: ExerciseType) => {
    setExerciseType(type);
    onOpen();
  };

  return (
    <>
      <SimpleGrid
        h="full"
        w="full"
        gap={4}
        {...props}
      >
        {EXERCISE_TYPE_CONFIG.map(({ description, icon, title, type }) => (
          <ElevatedButton
            key={title}
            onClick={() => handleExerciseClick(type)}
            whiteSpace="normal"
            h="auto"
            w="full"
            minH={{ base: '100px', md: '224px' }}
            p={6}
          >
            {/* heading + description */}
            <VStack align="start" h="full" w="full" gap={4}>
              <Icon
                as={icon}
                boxSize={{ base: '48px', md: '72px' }}
                alignSelf="center"
              />
              <VStack align="center" w="full">
                <Heading fontSize={{ base: 'md', md: 'xl' }}>{title}</Heading>
                <Text
                  fontSize="xs"
                  textAlign="center"
                  color="gray.fg"
                  fontWeight="400"
                  minW="104px"
                  display={{ base: 'none', md: 'inline-flex' }}
                >
                  {description}
                </Text>
              </VStack>
            </VStack>
          </ElevatedButton>
        ))}
      </SimpleGrid>
      <NewExerciseModal
        exerciseType={exerciseType}
        isOpen={open}
        onClose={onClose}
      />
    </>
  );
};
