import { FaDrum, FaDrumSteelpan, FaGuitar, FaMusic } from "react-icons/fa";
import {
  HiDotsHorizontal,
  HiOutlinePencil,
  HiOutlineTrash,
} from "react-icons/hi";

import {
  Button,
  createListCollection,
  Heading,
  Icon,
  Stack,
  Tag,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { Exercise } from "@prisma/client";

import { Card } from "@/components/Card";
import { Menu } from "@/components/ui/menu";
import { useExercises } from "@/hooks/use-exercises";
import { redirect } from "next/navigation";
import { useEffect } from "react";

const EXERCISE_TYPE_LABEL_MAP = {
  Interval: { label: "Intervals", icon: <FaMusic />, color: "purple" },
  Chord: { label: "Chords", icon: <FaGuitar />, color: "orange" },
  Scale: { label: "Scales", icon: <FaDrum />, color: "teal" },
  ScaleDegree: {
    label: "Scale Degrees",
    icon: <FaDrumSteelpan />,
    color: "yellow",
  },
};

const MORE_MENU_ITEMS = createListCollection({
  items: [
    { label: "Rename", value: "rename", icon: HiOutlinePencil },
    {
      label: "Delete",
      value: "delete",
      icon: HiOutlineTrash,
      color: "red.500",
    },
  ],
});

const emptyStateCta = {
  icon: HiOutlinePencil,
  primary: "Build your training library",
  secondary: "Create custom exercises for intervals, chords, and scales.",
};

/**
 * This component renders a home page block with a "Create Exercise" button
 * that opens the flow for creating a new exercise.
 */
export const ExerciseList = () => {
  const { exercises, refetch, isLoadingExercises } = useExercises();

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <Card overflow="hidden">
      <Card.Header>Your exercises</Card.Header>

      {isLoadingExercises && !exercises && <Card.LoadingState />}

      {!isLoadingExercises && !exercises?.length && (
        <Card.EmptyState
          icon={emptyStateCta.icon}
          primaryText={emptyStateCta.primary}
          secondaryText={emptyStateCta.secondary}
          buttonConfig={{ copy: "Create new exercise", href: "/exercises" }}
        />
      )}

      {!isLoadingExercises && !!exercises?.length && (
        <Card.Content overflow="auto" gap={2}>
          {exercises?.map((exercise: Exercise) => (
            <ListItem key={exercise.id} exercise={exercise} />
          ))}
        </Card.Content>
      )}
    </Card>
  );
};

const ListItem = ({ exercise }: { exercise: Exercise }) => {
  const { destroy } = useExercises(exercise.id);
  const { open: isOpen, onOpen, onClose } = useDisclosure();

  const { icon, label, color } = EXERCISE_TYPE_LABEL_MAP[exercise.type];
  const date = new Date(exercise.createdAt);

  /* handlers */
  const handleMenuOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onOpen();
  };

  const handleMenuSelect = async (value: string) => {
    switch (value) {
      case "delete":
        destroy();
        break;
    }
    onClose();
  };

  return (
    <Stack
      p={4}
      direction="row"
      justify="space-between"
      align="start"
      rounded="xl"
      border="1px solid"
      borderColor="border.muted"
      _hover={{ bg: "gray.50" }}
      cursor="pointer"
      onClick={() => redirect(`/exercises/${exercise.id}`)}
    >
      {/* title + tag + questions + date */}
      <Stack align="start">
        <Heading size="sm">{exercise.name || "(No title)"}</Heading>
        <Stack
          direction={{ base: "column", lg: "row" }}
          justify="start"
          align={{ base: "flex-start", lg: "center" }}
          gap={2}
        >
          <Tag.Root colorPalette={color}>
            <Tag.Label>
              <Stack direction="row" align="center">
                <Icon size="xs">{icon}</Icon>
                {label}
              </Stack>
            </Tag.Label>
          </Tag.Root>
          <Text fontSize="xs">
            {`${exercise.numQuestions} ${
              exercise.numQuestions > 1 ? "Questions" : "Question"
            }`}
          </Text>
          <Text fontSize="xs">
            {date.toLocaleDateString(navigator.language)}
          </Text>
        </Stack>
      </Stack>
      {/* action menu */}
      <Menu
        isOpen={isOpen}
        items={MORE_MENU_ITEMS}
        onPointerDownOutside={onClose}
        onSelect={handleMenuSelect}
      >
        <Button size="xs" variant="ghost" onClick={handleMenuOpen}>
          <HiDotsHorizontal />
        </Button>
      </Menu>
    </Stack>
  );
};
