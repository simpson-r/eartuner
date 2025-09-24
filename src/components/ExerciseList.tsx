import { Link, Stack, Text } from "@chakra-ui/react";
import { Exercise } from "@prisma/client";

import { Card } from "@/components/Card";

interface Props {
  exercises: Exercise[] | null;
  onClick: VoidFunction;
}

/**
 * This component renders a home page block with a "Create Exercise" button
 * that opens the flow for creating a new exercise.
 */
export const ExerciseList = ({ exercises }: Props) => {
  return (
    <Card title="Your exercises">
      {!exercises?.length ? (
        <Card.Placeholder
          placeholder={
            <Stack textAlign="center" margin="auto">
              <Text>Build consistency and measure your growth.</Text>
              <Link href="/exercises" colorPalette="blue" variant="underline">
                Get started by creating customized ear training exercises.
              </Link>
            </Stack>
          }
        />
      ) : (
        exercises?.map((exercise) => <ListItem exercise={exercise} />)
      )}
    </Card>
  );
};

const ListItem = ({ exercise }: { exercise: Exercise }) => {
  return (
    <Stack alignItems="flex-start">
      <Stack>
        <Text>{exercise.name}</Text>
        <Text>{exercise.type}</Text>
      </Stack>
    </Stack>
  );
};
