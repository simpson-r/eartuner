/**
 * TYPE
 */
interface ExerciseTheoryConfig<
  Groups extends Record<string, string[]>,
  Formulas extends Record<string, unknown>,
> {
  groups: Groups;
  formulas: Formulas;
  labels: Record<keyof Formulas, string>;
}

/**
 * UI DISPLAY LABELS
 */
const intervalLabels = {
  P1: 'Unison',
  m2: 'Minor 2nd',
  M2: 'Major 2nd',
  m3: 'Minor 3rd',
  M3: 'Major 3rd',
  P4: 'Perfect 4th',
  d5: 'Diminished 5th',
  P5: 'Perfect 5th',
  m6: 'Minor 6th',
  M6: 'Major 6th',
  m7: 'Minor 7th',
  M7: 'Major 7th',
  P8: 'Octave',
};

const scaleLabels = {
  major: 'Major',
  minor: 'Natural Minor',
  harmonic: 'Harmonic Minor',
  dorian: 'Dorian',
  phrygian: 'Phrygian',
  lydian: 'Lydian',
  mixolydian: 'Mixolydian',
  locrian: 'Locrian',
};

const chordLabels = {
  maj: 'Major Triad',
  min: 'Minor Triad',
  dim: 'Diminished Triad',
  aug: 'Augmented Triad',
  dom7: 'Dominant 7th',
  maj7: 'Major 7th',
  min7: 'Minor 7th',
  dim7: 'Diminished 7th',
  halfDim7: 'Half-Diminished 7th (m7♭5)',
};

const scaleDegreeLabels = {
  '1': 'Tonic (1)',
  b2: 'Flat 2nd (♭2)',
  '2': 'Supertonic (2)',
  b3: 'Flat 3rd (♭3)',
  '3': 'Mediant (3)',
  '4': 'Subdominant (4)',
  '#4': 'Sharp 4th (♯4)',
  '5': 'Dominant (5)',
  b6: 'Flat 6th (♭6)',
  '6': 'Submediant (6)',
  b7: 'Flat 7th (♭7)',
  '7': 'Leading Tone (7)',
};

/**
 * MUSIC THEORY DATA
 */
export const intervals = {
  P1: { semitones: 0 },
  m2: { semitones: 1 },
  M2: { semitones: 2 },
  m3: { semitones: 3 },
  M3: { semitones: 4 },
  P4: { semitones: 5 },
  d5: { semitones: 6 },
  P5: { semitones: 7 },
  m6: { semitones: 8 },
  M6: { semitones: 9 },
  m7: { semitones: 10 },
  M7: { semitones: 11 },
  P8: { semitones: 12 },
};

export const scales = {
  major: { formula: [2, 2, 1, 2, 2, 2, 1] },
  minor: { formula: [2, 1, 2, 2, 1, 2, 2] },
  harmonic: { formula: [2, 1, 2, 2, 1, 3, 1] },
  dorian: { formula: [2, 1, 2, 2, 2, 1, 2] },
  phrygian: { formula: [1, 2, 2, 2, 1, 2, 2] },
  lydian: { formula: [2, 2, 2, 1, 2, 2, 1] },
  mixolydian: { formula: [2, 2, 1, 2, 2, 1, 2] },
  locrian: { formula: [1, 2, 2, 1, 2, 2, 2] },
};

export const chords = {
  maj: { formula: [0, 4, 7] },
  min: { formula: [0, 3, 7] },
  dim: { formula: [0, 3, 6] },
  aug: { formula: [0, 4, 8] },
  dom7: { formula: [0, 4, 7, 10] },
  maj7: { formula: [0, 4, 7, 11] },
  min7: { formula: [0, 3, 7, 10] },
  dim7: { formula: [0, 3, 6, 9] },
  halfDim7: { formula: [0, 3, 6, 10] },
};

export const scaleDegrees = {
  '1': { offset: 0 },
  b2: { offset: 1 },
  '2': { offset: 2 },
  b3: { offset: 3 },
  '3': { offset: 4 },
  '4': { offset: 5 },
  '#4': { offset: 6 }, // or 'b5' depending on context
  '5': { offset: 7 },
  b6: { offset: 8 },
  '6': { offset: 9 },
  b7: { offset: 10 },
  '7': { offset: 11 },
};

/**
 * EXERCISE GROUPINGS
 */
const intervalGroupings = {
  simple: ['M3', 'P5', 'P8'],
  diatonic: ['M2', 'M3', 'P4', 'P5', 'M6', 'M7', 'P8'],
  all: Object.keys(intervals),
};

export const scaleGroupings = {
  simple: ['major', 'minor', 'harmonic'],
  modal: ['dorian', 'phrygian', 'lydian', 'mixolydian', 'locrian'],
  all: Object.keys(scales),
};

export const chordGroupings = {
  triad: ['maj', 'min', 'dim', 'aug'],
  seventh: ['dom7', 'maj7', 'min7', 'dim7', 'halfDim7'],
  all: Object.keys(chords),
};

export const scaleDegreeGroupings = {
  simple: ['1', '3', '5'],
  diatonic: ['1', '2', '3', '4', '5', '6', '7'],
  all: Object.keys(scaleDegrees),
};

export const groupings = {
  Interval: intervalGroupings,
  Chord: chordGroupings,
  Scale: scaleGroupings,
  ScaleDegree: scaleDegreeGroupings,
};

/**
 * GLOBAL CONFIG
 */
export const EXERCISE_THEORY_CONFIG: {
  Interval: ExerciseTheoryConfig<typeof intervalGroupings, typeof intervals>;
  Chord: ExerciseTheoryConfig<typeof chordGroupings, typeof chords>;
  Scale: ExerciseTheoryConfig<typeof scaleGroupings, typeof scales>;
  ScaleDegree: ExerciseTheoryConfig<
    typeof scaleDegreeGroupings,
    typeof scaleDegrees
  >;
} = {
  Interval: {
    groups: intervalGroupings,
    formulas: intervals,
    labels: intervalLabels,
  },
  Chord: {
    groups: chordGroupings,
    formulas: chords,
    labels: chordLabels,
  },
  Scale: {
    groups: scaleGroupings,
    formulas: scales,
    labels: scaleLabels,
  },
  ScaleDegree: {
    groups: scaleDegreeGroupings,
    formulas: scaleDegrees,
    labels: scaleDegreeLabels,
  },
};
