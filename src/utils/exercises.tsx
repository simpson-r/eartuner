import { FaMusic, FaWaveSquare, FaRandom, FaGuitar } from "react-icons/fa";

import { ExerciseType } from "@prisma/client";

import {
  chordTypes,
  intervalTypes,
  intervalDirection,
  chordInversions,
  scaleTypes,
  scaleDirection,
  scaleDegreeTypes,
} from "@/utils/exercise-collections";
import { CollectionConfig } from "@/utils/types";

import React from "react";

/**
 * Exercises and corresponding icon and descriptions to be displayed on home and exercise pages
 */
type Exercises = {
  title: string;
  type: ExerciseType;
  icon: React.ReactElement;
  description: string;
};

export const exercises: Exercises[] = [
  {
    title: "Intervals",
    type: ExerciseType.Interval,
    icon: <FaWaveSquare />,
    description: "Identify the distance between two notes.",
  },
  {
    title: "Chords",
    type: ExerciseType.Chord,
    icon: <FaMusic />,
    description: "Identify the type of chord you hear.",
  },
  {
    title: "Scales",
    type: ExerciseType.Scale,
    icon: <FaGuitar />,
    description: "Recognize the scale being played.",
  },
  {
    title: "Scale degrees",
    type: ExerciseType.ScaleDegree,
    icon: <FaRandom />,
    description: "Practice with a mix of all exercise types.",
  },
];

/**
 * Exercise modal configs
 */
type ExerciseConfig = {
  showFixedRoot?: boolean;
  showAutoProceed?: boolean;
  showHarmonicToggle?: boolean;
  primary: CollectionConfig;
  secondary?: CollectionConfig;
  tertiary?: CollectionConfig;
};

export const exerciseConfigs: Record<ExerciseType, ExerciseConfig> = {
  Interval: {
    primary: {
      key: "intervals",
      control: "select",
      label: "Intervals",
      list: intervalTypes,
      default: "simple",
      selection: { multi: true, min: 1 },
      help: "Choose one or more intervals to practice.",
    },
    secondary: {
      key: "direction",
      label: "Direction",
      control: "select",
      list: intervalDirection,
      default: "asc",
      selection: { multi: false, min: 1, max: 1 },
    },

    showFixedRoot: true,
    showAutoProceed: true,
  },

  Chord: {
    primary: {
      key: "chords",
      label: "Chord Types",
      control: "select",
      list: chordTypes,
      default: "triads",
      selection: { multi: true, min: 1 },
    },
    secondary: {
      key: "inversions",
      label: "Inversions",
      control: "checkbox",
      list: chordInversions,
      default: "root",
      selection: { multi: true, min: 1 },
    },

    showFixedRoot: true,
    showAutoProceed: true,
    showHarmonicToggle: true,
  },

  Scale: {
    primary: {
      label: "Scale Types",
      key: "scales",
      control: "select",
      list: scaleTypes,
      placeholder: "Select scale types",
      default: "major-minor",
      selection: { multi: true, min: 1 },
    },
    secondary: {
      key: "scaleDirection",
      label: "Direction",
      control: "select",
      list: scaleDirection,
      default: "asc",
      selection: { multi: false, min: 1, max: 1 },
    },

    showFixedRoot: true,
    showAutoProceed: true,
  },

  ScaleDegree: {
    primary: {
      label: "Degrees",
      key: "degrees",
      control: "select",
      list: scaleDegreeTypes,
      default: "simple",
      selection: { multi: true, min: 1 },
      help: "Choose the scale degrees you want to identify by ear.",
    },
    // secondary: {
    //   key: "context",
    //   label: "Key Context",
    //   control: "radio",
    //   // list: [
    //   //   { value: "major", label: "Major" },
    //   //   { value: "minor", label: "Minor" },
    //   // ],
    //   defaults: ["major"],
    //   selection: { multi: false, min: 1, max: 1 },
    // },

    showFixedRoot: true,
    showAutoProceed: true,
  },
};
