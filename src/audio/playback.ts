'use client';

import * as Tone from 'tone';
import { chords, intervals, scaleDegrees, scales } from '@/config/theory';
import { shuffle } from '@/utils/utils';
import { ChordInversion, PlaybackDirection } from '@/features/exercise/types';
import { Sampler } from 'tone';

/**
 * CONSTANTS
 */
const ONE_SEC = 1000;
const INT_VEL = 0.9;
const CHORD_VEL = 0.5;
const NOTE_DUR = 1;
const NOTE_DELAY = 0.8;
const DEGREE_DELAY = 1.6;
const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

/**
 * HELPERS
 */
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const midiToName = (m: number) => `${NOTES[m % 12]}${Math.floor(m / 12) - 1}`;

const transpose = (midi: number, semitones: number) => midi + semitones;

const rotateLeft = (arr: number[], k: number): number[] => {
  const modK = k % arr.length;
  return [...arr.slice(modK), ...arr.slice(0, modK)];
};

const inversionMap = {
  first: 1,
  second: 2,
  third: 3,
};

/**
 * PLAYBACK METHODS
 */
export async function playInterval(
  instrument: Sampler,
  midiRoot: number,
  key: keyof typeof intervals,
  mode: PlaybackDirection = 'asc',
) {
  const offset = intervals[key].semitones; // e.g., 4 for M3
  const a = midiToName(midiRoot);
  const b = midiToName(transpose(midiRoot, offset));

  const now = Tone.now();

  switch (mode) {
    case 'harmonic':
      instrument.triggerAttackRelease([a, b], NOTE_DUR, now, INT_VEL);
      return sleep(NOTE_DUR * ONE_SEC);

    case 'asc':
      instrument.triggerAttackRelease(a, NOTE_DUR, now, INT_VEL);
      instrument.triggerAttackRelease(b, NOTE_DUR, now + NOTE_DELAY, INT_VEL);
      return sleep((NOTE_DUR + NOTE_DELAY) * ONE_SEC);

    case 'des':
      instrument.triggerAttackRelease(b, NOTE_DUR, now, INT_VEL);
      instrument.triggerAttackRelease(a, NOTE_DUR, now + NOTE_DELAY, INT_VEL);
      return sleep((NOTE_DUR + NOTE_DELAY) * ONE_SEC);
    case 'asc-des':
      const order = shuffle([a, b]);
      instrument.triggerAttackRelease(order[0], NOTE_DUR, now, INT_VEL);
      instrument.triggerAttackRelease(
        order[1],
        NOTE_DUR,
        now + NOTE_DELAY,
        INT_VEL,
      );
      return sleep((NOTE_DUR + NOTE_DELAY) * ONE_SEC);
  }
}

export async function playChord(
  instrument: Sampler,
  midiRoot: number,
  key: keyof typeof chords,
  mode: ChordInversion = 'root',
) {
  let formula = chords[key].formula;

  if (mode !== 'root') {
    const rotationAmount = inversionMap[mode];
    const inverted = rotateLeft(formula, rotationAmount);
    const baseInterval = formula[rotationAmount]; // new root pitch ceiling
    formula = inverted.map((st) => (st < baseInterval ? st + 12 : st));
  }

  const notes = formula.map((st) => midiToName(transpose(midiRoot, st)));

  instrument.triggerAttackRelease(notes, NOTE_DUR, Tone.now(), CHORD_VEL);
  return sleep(NOTE_DUR * ONE_SEC);
}

export async function playScale(
  instrument: Sampler,
  midiRoot: number,
  key: keyof typeof scales,
  mode: PlaybackDirection = 'asc',
  dur: number = NOTE_DUR,
) {
  const notes = scales[key].formula.reduce(
    (acc, st) => {
      const nextMidi = transpose(acc.midi, st);
      acc.names.push(midiToName(nextMidi));
      return { midi: nextMidi, names: acc.names };
    },
    { midi: midiRoot, names: [midiToName(midiRoot)] },
  ).names;

  if (mode === 'des') notes.reverse();

  notes.forEach((note, i) =>
    instrument.triggerAttackRelease(
      note,
      dur,
      Tone.now() + i * NOTE_DELAY,
      0.7,
    ),
  );
  return sleep((NOTE_DUR + NOTE_DELAY * notes.length) * ONE_SEC);
}

export async function playScaleDegree(
  instrument: Sampler,
  midiRoot: number,
  key: keyof typeof scaleDegrees,
) {
  const majorFormula = chords['maj'].formula;
  const offset = scaleDegrees[key].offset;
  const degreeNote = midiToName(transpose(midiRoot, offset));


  const now = Tone.now();

  const notes = majorFormula.map((st) => midiToName(transpose(midiRoot, st)));

  instrument.triggerAttackRelease(notes, NOTE_DUR, Tone.now(), CHORD_VEL);
  instrument.triggerAttackRelease(
    degreeNote,
    NOTE_DUR,
    now + DEGREE_DELAY,
    INT_VEL,
  );
  return sleep((NOTE_DUR + DEGREE_DELAY) * ONE_SEC);
}
