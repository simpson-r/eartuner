import { ExerciseType } from '@prisma/client';

import PianoIcon from '@/assets/piano.svg?component';
import NotesIcon from '@/assets/notes.svg?component';
import GuitarIcon from '@/assets/guitar.svg?component';
import TuningIcon from '@/assets/tuning-fork.svg?component';
import React from 'react';

/**
 * EXERCISE DESCRIPTION CONFIG
 */
type Exercises = {
  title: string;
  type: ExerciseType;
  icon: React.FunctionComponent;
  description: string;
  color: string;
};

export const EXERCISE_LABEL_CONFIG = {
  Interval: { label: 'Intervals', color: 'blue' },
  Chord: { label: 'Chords', color: 'orange' },
  Scale: { label: 'Scales', color: 'yellow' },
  ScaleDegree: { label: 'Scale Degrees', color: 'green' },
};

export const EXERCISE_TYPE_CONFIG: Exercises[] = [
  {
    title: 'Intervals',
    type: ExerciseType.Interval,
    icon: TuningIcon,
    description: 'Identify the interval between two played notes',
    color: EXERCISE_LABEL_CONFIG.Interval.color,
  },
  {
    title: 'Chords',
    type: ExerciseType.Chord,
    icon: GuitarIcon,
    description: 'Identify chord quality by ear',
    color: EXERCISE_LABEL_CONFIG.Chord.color,
  },
  {
    title: 'Scales',
    type: ExerciseType.Scale,
    icon: NotesIcon,
    description: 'Identify scales from short melodic runs',
    color: EXERCISE_LABEL_CONFIG.Scale.color,
  },
  {
    title: 'Scale degrees',
    type: ExerciseType.ScaleDegree,
    icon: PianoIcon,
    description: 'Hear a single note and label its degree in the key',
    color: EXERCISE_LABEL_CONFIG.ScaleDegree.color,
  },
];
