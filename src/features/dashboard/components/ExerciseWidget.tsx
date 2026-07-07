import {
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
export const ExerciseWidget = ({
  columns,
}: {
  columns?: SimpleGridProps['columns'];
}) => {
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
      <SimpleGrid columns={columns} h="full" w="full" gap={4}>
        {EXERCISE_TYPE_CONFIG.map(
          ({ description, icon, title, type }) => (
            <ElevatedButton
              key={title}
              onClick={() => handleExerciseClick(type)}
              whiteSpace="normal"
              minH="unset"
              h="auto"
              w="full"
              p={6}
            >
              {/* heading + description */}
              <VStack align="start" h="full" w="full" gap={6}>
                <Icon as={icon} boxSize={{ base: '30px', md: '60px' }} />
                <VStack align="flex-start">
                  <Heading fontSize={{ base: 'sm', md: 'lg' }}>
                    {title}
                  </Heading>
                  <Text
                    fontSize="xs"
                    textAlign="left"
                    color="gray.fg"
                    fontWeight="400"
                    display={{ base: 'none', md: 'inline-flex' }}
                  >
                    {description}
                  </Text>
                </VStack>
              </VStack>
            </ElevatedButton>
          ),
        )}
      </SimpleGrid>
      <NewExerciseModal
        exerciseType={exerciseType}
        isOpen={open}
        onClose={onClose}
      />
    </>
  );
};
