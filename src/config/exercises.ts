import React from 'react';
import { ExerciseType } from '@prisma/client';

import Tuningicon from '@/assets/tuning-fork.svg?component';
import NotesIcon from '@/assets/notes.svg?component';
import GuitarIocn from '@/assets/guitar.svg?component';
import Pianoicon from '@/assets/piano.svg?component';

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
  Interval: { label: 'Intervals', color: 'cobalt.600' },
  Chord: { label: 'Chords', color: 'cobalt.400' },
  Scale: { label: 'Scales', color: 'cobalt.200' },
  ScaleDegree: { label: 'Scale Degrees', color: 'cobalt.50' },
};

export const EXERCISE_TYPE_CONFIG: Exercises[] = [
  {
    title: 'Intervals',
    type: ExerciseType.Interval,
    icon: Tuningicon,
    description: 'Identify the interval between two played notes',
    color: EXERCISE_LABEL_CONFIG.Interval.color,
  },
  {
    title: 'Chords',
    type: ExerciseType.Chord,
    icon: GuitarIocn,
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
    icon: Pianoicon,
    description: 'Hear a single note and label its degree in the key',
    color: EXERCISE_LABEL_CONFIG.ScaleDegree.color,
  },
];
