import { Card } from "./Card";
import { HiOutlineClock } from "react-icons/hi";

const emptyStateCta = {
  primary: "See your progress grow",
  secondary: "Track accuracy, streaks, and progress over time.",
};
/**
 * This component renders a home page block with a "Create Exercise" button
 * that opens the flow for creating a new exercise.
 */
export const ActivityList = () => {
  return (
    <Card>
      <Card.Header>Recent activity</Card.Header>
      <Card.EmptyState
        icon={HiOutlineClock}
        primaryText={emptyStateCta.primary}
        secondaryText={emptyStateCta.secondary}
      />
    </Card>
  );
};
