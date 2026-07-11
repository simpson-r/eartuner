import { ListCollection } from '@chakra-ui/react';
import { ExerciseType, UserPreferences } from '@prisma/client';

/**
 * EXERCISE MODAL CONFIG TYPES
 */
export type ControlType = 'checkbox' | 'radio' | 'select';

export type FieldKey = 'selected' | 'playback' | 'options';

export type CollectionValue<T extends ListCollection> =
  T['items'][number]['value'];

export type CollectionConfig<T extends ListCollection = ListCollection> = {
  key: FieldKey;
  label: string;
  defaultValue: CollectionValue<T>;
  help?: string;
  list: T;
  control: ControlType;
};

/**
 * API TYPES
 */
export type ExerciseCreateRequest = {
  exerciseType: ExerciseType;
  score: number;
  numQuestions: number;
  durationSec?: number;
  meta: ExerciseMetadata[];
};

export type ClientPreferences = Omit<UserPreferences, 'userId'>;

/**
 * EXERCISE STATE TYPES
 */
export type ExerciseFormState = {
  selected: string; // selected preset/grouping - ex."simple", "diatonic", "all", "custom"
  items?: string[];
  playback: string;
  numQuestions: number;
  fixedRoot?: boolean;
  autoProceed?: boolean;
};

export interface ExerciseConfig {
  type: ExerciseType;
  items: string[];
  playback: PlaybackMode;
  numQuestions: number;
  fixedRoot?: boolean;
  autoProceed?: boolean;
}

export type PlaybackDirection = 'harmonic' | 'asc' | 'des' | 'asc-des';
export type ChordInversion = 'root' | 'first' | 'second' | 'third';
export type PlaybackMode = PlaybackDirection | ChordInversion;

export interface Question {
  root: number;
  answer: string;
  selected?: string;
}

export interface ExerciseMetadata {
  answered: string;
  expected: string;
  correct: boolean;
}
