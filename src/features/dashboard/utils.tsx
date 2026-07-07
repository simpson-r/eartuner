import { createListCollection } from '@chakra-ui/react';
import { ExerciseType } from '@prisma/client';

import { CollectionConfig } from '@/utils/types';



/**
 * Collections assorted by exercise type
 */
export const collections = {
  interval: {
    types: createListCollection({
      items: [
        { label: 'Simple (M3, P5, Octave)', value: 'simple' },
        {
          label: 'Diatonic (M2, M3, P4, P5, M6, M7, Octave)',
          value: 'diatonic',
        },
        { label: 'All', value: 'all' },
      ],
    }),
    playback: createListCollection({
      items: [
        { label: 'Ascending', value: 'asc' },
        { label: 'Descending', value: 'des' },
        { label: 'Ascending & Descending', value: 'asc-des' },
        { label: 'Harmonic', value: 'harmonic' },
      ],
    }),
  },
  chords: {
    types: createListCollection({
      items: [
        { label: 'Triads (maj, min, dim, aug)', value: 'triad' },
        { label: 'Basic sevenths (dom, maj, min)', value: 'seventh' },
        { label: 'Triads and basic sevenths', value: 'all' },
      ],
    }),
    playback: createListCollection({
      items: [
        { label: 'Root', value: 'root' },
        { label: '1st inversion', value: 'first' },
        { label: '2nd inversion', value: 'second' },
        { label: '3rd inversion', value: 'third' },
      ],
    }),
  },
  scales: {
    types: createListCollection({
      items: [
        { label: 'Major, Minor, Harmonic Minor', value: 'simple' },
        { label: 'Modes (Lydian, Phrygian, Mixolydian etc.)', value: 'modal' },
        { label: 'All', value: 'all' },
      ],
    }),
    playback: createListCollection({
      items: [
        { label: 'Ascending', value: 'asc' },
        { label: 'Descending', value: 'des' },
      ],
    }),
  },
  scaleDegree: {
    types: createListCollection({
      items: [
        { label: 'Simple (1st, 3rd, 5th)', value: 'simple' },
        { label: 'Diatonic', value: 'diatonic' },
        { label: 'Chromatic', value: 'all' },
      ],
    }),
  },
};

/**
 * EXERCISE UI CONFIG
 */
type ExerciseConfig = {
  showHarmonicToggle?: boolean;
  primary: CollectionConfig;
  secondary?: CollectionConfig;
  tertiary?: CollectionConfig;
};

export const exerciseConfigs: Record<ExerciseType, ExerciseConfig> = {
  Interval: {
    primary: {
      key: 'selected',
      control: 'select',
      label: 'Intervals',
      list: collections.interval.types,
      defaultValue: 'simple',

      help: 'Choose one or more intervals to practice.',
    },
    secondary: {
      key: 'playback',
      label: 'Playback',
      control: 'select',
      list: collections.interval.playback,
      defaultValue: 'asc',
    },
  },
  Chord: {
    primary: {
      key: 'selected',
      control: 'select',
      label: 'Chord Types',
      list: collections.chords.types,
      defaultValue: 'triad',
    },
    secondary: {
      key: 'playback',
      label: 'Inversions',
      control: 'checkbox',
      list: collections.chords.playback,
      defaultValue: 'root',
    },
  },
  Scale: {
    primary: {
      key: 'selected',
      control: 'select',
      label: 'Scale Types',
      list: collections.scales.types,
      help: 'Select scale types',
      defaultValue: 'simple',
    },
    secondary: {
      key: 'playback',
      control: 'select',
      label: 'Playback',
      list: collections.scales.playback,
      defaultValue: 'asc',
    },
  },
  ScaleDegree: {
    primary: {
      key: 'selected',
      label: 'Degrees',
      control: 'select',
      list: collections.scaleDegree.types,
      defaultValue: 'simple',
      help: 'Choose the scale degrees you want to identify by ear.',
    },
  },
};
