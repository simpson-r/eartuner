'use client';

import * as Tone from 'tone';
import { Instrument } from '@prisma/client';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let samplerPromise: Promise<any> | null = null;

export const ensureAudioReady = async () => {
  const audioContext = Tone.getContext();
  if (audioContext.state !== 'running') {
    await Tone.start();
    await audioContext.resume();
  }
};

export async function loadInstruments(instrument: Instrument) {
  const { base, urls } = samples[instrument];

  if (!samplerPromise) {
    samplerPromise = new Promise((resolve) => {
      const s = new Tone.Sampler({
        urls,
        baseUrl: `/samples/${base}`,
        attack: 0.005,
        release: 2,
        onload: () => resolve(s),
      }).toDestination();
      s.volume.value = -6; // headroom
    });
  }
  return samplerPromise;
}

const piano = {
  C3: 'C3.mp3',
  'C#3': 'Csharp3.mp3',
  D3: 'D3.mp3',
  'D#3': 'Dsharp3.mp3',
  E3: 'E3.mp3',
  F3: 'F3.mp3',
  'F#3': 'Fsharp3.mp3',
  G3: 'G3.mp3',
  'G#3': 'Gsharp3.mp3',
  A3: 'A3.mp3',
  'A#3': 'Asharp3.mp3',
  B3: 'B3.mp3',
  C4: 'C4.mp3',
  'C#4': 'Csharp4.mp3',
  D4: 'D4.mp3',
  'D#4': 'Dsharp4.mp3',
  E4: 'E4.mp3',
  F4: 'F4.mp3',
  'F#4': 'Fsharp4.mp3',
  G4: 'G4.mp3',
  'G#4': 'Gsharp4.mp3',
  A4: 'A4.mp3',
  'A#4': 'Asharp4.mp3',
  B4: 'B4.mp3',
  C5: 'C5.mp3',
  'C#5': 'Csharp5.mp3',
  D5: 'D5.mp3',
  'D#5': 'Dsharp5.mp3',
  E5: 'E5.mp3',
  F5: 'F5.mp3',
  'F#5': 'Fsharp5.mp3',
  G5: 'G5.mp3',
  'G#5': 'Gsharp5.mp3',
  A5: 'A5.mp3',
  'A#5': 'Asharp5.mp3',
  B5: 'B5.mp3',
  C6: 'C6.mp3',
  'C#6': 'Csharp6.mp3',
  D6: 'D6.mp3',
  'D#6': 'Dsharp6.mp3',
  E6: 'E6.mp3',
  F6: 'F6.mp3',
  'F#6': 'Fsharp6.mp3',
  G6: 'G6.mp3',
  'G#6': 'Gsharp6.mp3',
  A6: 'A6.mp3',
  'A#6': 'Asharp6.mp3',
  B6: 'B6.mp3',
};

const guitar = {
  'F#2': 'Fs2.ogg',
  'F#3': 'Fs3.ogg',
  'F#4': 'Fs4.ogg',
  'F#5': 'Fs5.ogg',
  G3: 'G3.ogg',
  G5: 'G3.ogg',
  'G#2': 'Gs2.ogg',
  'G#4': 'Gs4.ogg',
  'G#5': 'Gs5.ogg',
  A2: 'A2.ogg',
  A3: 'A3.ogg',
  A4: 'A4.ogg',
  A5: 'A5.ogg',
  'A#5': 'As5.ogg',
  B1: 'B1.ogg',
  B2: 'B2.ogg',
  B3: 'B3.ogg',
  B4: 'B4.ogg',
  'C#3': 'Cs3.ogg',
  'C#4': 'Cs4.ogg',
  'C#5': 'Cs5.ogg',
  D2: 'D2.ogg',
  D3: 'D3.ogg',
  D5: 'D5.ogg',
  'D#4': 'Ds4.ogg',
  E2: 'E2.ogg',
  E3: 'E3.ogg',
  E4: 'E4.ogg',
  E5: 'E5.ogg',
};

const samples = {
  Piano: { base: 'piano/', urls: piano },
  Guitar: { base: 'guitar/', urls: guitar },
};
