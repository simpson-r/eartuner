import { ListCollection } from "@chakra-ui/react";
import { ExerciseType } from "@prisma/client";

/**
 * exercise config types
 */
export type ControlType = "checkbox" | "radio" | "select";

type SelectionRule = { multi?: boolean; min?: number; max?: number };

type FieldKey =
  | "intervals"
  | "direction"
  | "chords"
  | "inversions"
  | "scales"
  | "scaleDirection"
  | "context"
  | "degrees";

export type CollectionConfig = {
  label: string;
  placeholder?: string;
  default?: string;
  help?: string;
  key: FieldKey;
  list: ListCollection;
  control: ControlType;
  selection?: SelectionRule;
};

/**
 * api types
 */
export type CreateExerciseBody = {
  name: string;
  numQuestions: number;
  type: ExerciseType;
  settings: Record<string, unknown>;
};
