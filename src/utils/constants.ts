import { ExerciseType } from '@prisma/client';

export const QUESTION_MIN = 5;
export const QUESTION_MAX = 100;
export const DEFAULT_QUESTION_COUNT = 10;

export const EXERCISE_NAME_MAP: Record<ExerciseType, string> = {
  Interval: 'interval',
  Chord: 'chord',
  ScaleDegree: 'scale degree',
  Scale: 'scale',
};
