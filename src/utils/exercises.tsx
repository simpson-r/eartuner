import { FaMusic, FaWaveSquare, FaRandom, FaGuitar } from "react-icons/fa";

import { ListCollection } from "@chakra-ui/react";
import {
  chordTypes,
  intervalTypes,
  intervalDirection,
  chordInversions,
  scaleTypes,
  scaleDirection,
  scaleDegreeTypes,
} from "@/utils/exercise-collections";
import { Exercise } from "@/lib/types";
import React from "react";

/**
 * Exercises and corresponding icon and descriptions to be displayed on home and exercise pages
 */
type Exercises = {
  title: string;
  type: Exercise;
  icon: React.ReactElement;
  description: string;
};

export const exercises: Exercises[] = [
  {
    title: "Intervals",
    type: "intervals",
    icon: <FaWaveSquare />,
    description: "Identify the distance between two notes.",
  },
  {
    title: "Chords",
    type: "chords",
    icon: <FaMusic />,
    description: "Identify the type of chord you hear.",
  },
  {
    title: "Scales",
    type: "scales",
    icon: <FaGuitar />,
    description: "Recognize the scale being played.",
  },
  {
    title: "Scale degrees",
    type: "scaleDegrees",
    icon: <FaRandom />,
    description: "Practice with a mix of all exercise types.",
  },
];

/**
 * Exercise modal configs
 */
type CollectionConfig = {
  label: string;
  list: ListCollection;
  placeholder?: string;
};
type ExerciseConfig = {
  collection: CollectionConfig;
  subCollection?: CollectionConfig;
  showFixedRoot: boolean;
  showAutoProceed: boolean;
};

export const exerciseConfigurations: Record<Exercise, ExerciseConfig> = {
  chords: {
    collection: {
      label: "Chords",
      list: chordTypes,
      placeholder: "Select chord type",
    },
    subCollection: {
      label: "Inversions",
      list: chordInversions,
    },
    showFixedRoot: true,
    showAutoProceed: true,
  },
  intervals: {
    collection: {
      label: "Intervals",
      list: intervalTypes,
      placeholder: "Select interval type",
    },
    subCollection: {
      label: "Interval type",
      list: intervalDirection,
      placeholder: "Select interval direction",
    },
    showFixedRoot: true,
    showAutoProceed: true,
  },
  scales: {
    collection: {
      label: "Scales",
      list: scaleTypes,
      placeholder: "Select scale type",
    },
    subCollection: {
      label: "Direction",
      list: scaleDirection,
      placeholder: "Select scale direction",
    },
    showFixedRoot: true,
    showAutoProceed: true,
  },
  scaleDegrees: {
    collection: {
      label: "Scale degrees",
      list: scaleDegreeTypes,
      placeholder: "Select scale degree",
    },
    showFixedRoot: true,
    showAutoProceed: true,
  },
};
