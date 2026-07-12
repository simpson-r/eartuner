import { useEffect, useState } from 'react';
import * as Tone from 'tone';

import { Instrument } from '@prisma/client';

import { loadInstruments } from '@/audio/instruments';

export const useExerciseInstrument = (instrumentName: Instrument) => {
  const [instrument, setInstrument] = useState<Tone.Sampler | null>(null);

  useEffect(() => {
    let cancelled = false;

    const resumeAudio = async () => {
      await Tone.start();
      removeResumeListeners();
    };

    const removeResumeListeners = () => {
      window.removeEventListener('pointerdown', resumeAudio);
      window.removeEventListener('keydown', resumeAudio);
    };

    const initAudio = async () => {
      window.addEventListener('pointerdown', resumeAudio);
      window.addEventListener('keydown', resumeAudio);

      const loadedInstrument = await loadInstruments(instrumentName);
      setInstrument(loadedInstrument);
    };

    initAudio();

    return () => {
      cancelled = true;
      removeResumeListeners();
    };
  }, [instrumentName]);

  return instrument;
};
