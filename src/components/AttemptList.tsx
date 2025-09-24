import { Box, Heading, Stack } from "@chakra-ui/react";
import { Attempt } from "@prisma/client";
import { Card } from "./Card";

interface Props {
  attempts: Attempt[] | null;
}

/**
 * This component renders a home page block with a "Create Exercise" button
 * that opens the flow for creating a new exercise.
 */
export const ActivityList = ({ attempts }: Props) => {
  return (
    <Card title="Recent activity">
      {!attempts?.length ? (
        <Card.Placeholder placeholder="Complete your first exercise to see your results here." />
      ) : (
        <></>
      )}
    </Card>
  );
};
