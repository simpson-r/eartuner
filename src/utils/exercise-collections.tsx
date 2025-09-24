import { createListCollection } from "@chakra-ui/react";

/**
 * Interval list collection
 */
export const intervalTypes = createListCollection({
  items: [
    { label: "Simple (M3, P5, Octave)", value: "simple" },
    { label: "Diatonic (M2, M3, P4, P5, M6, M7, Octave)", value: "diatonic" },
    { label: "All", value: "all" },
  ],
});

export const intervalDirection = createListCollection({
  items: [
    { label: "Ascending", value: "asc" },
    { label: "Descending", value: "des" },
    { label: "Ascending & Descending", value: "asc-des" },
    { label: "Harmonic", value: "harmonic" },
  ],
});

/**
 * Chord list collection
 */
export const chordTypes = createListCollection({
  items: [
    { label: "Triads (maj, min, dim, aug)", value: "triads" },
    { label: "Basic sevenths (dom, maj, minor)", value: "sevenths" },
    { label: "Triads and basic sevenths", value: "triads-sevenths" },
  ],
});

export const chordInversions = createListCollection({
  items: [
    { label: "Root", value: "root" },
    { label: "1st inversion", value: "first" },
    { label: "2nd inversion", value: "second" },
    { label: "3rd inversion", value: "third" },
  ],
});

/**
 * Scale list collection
 */
export const scaleTypes = createListCollection({
  items: [
    { label: "Major, Minor", value: "major-minor" },
    { label: "Minor, Harmonic", value: "minors" },
    { label: "All", value: "all" },
  ],
});

export const scaleDirection = createListCollection({
  items: [
    { label: "Ascending", value: "asc" },
    { label: "Descending", value: "des" },
  ],
});

/**
 * Scale degree collection
 */
export const scaleDegreeTypes = createListCollection({
  items: [
    { label: "Simple (1st, 3rd, 5th)", value: "simple" },
    { label: "Diatonic", value: "diatonic" },
    { label: "Chromatic", value: "all" },
  ],
});
