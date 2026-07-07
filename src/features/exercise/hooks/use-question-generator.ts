import { useCallback, useEffect, useRef } from 'react';

import { shuffle } from '@/utils/helpers';
import { Question } from '@/utils/types';

const MIN_MIDI = 48; // C3
const MAX_MIDI = 59; // B3

/* HELPERS */
const randomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

/**
 * This hook handles randomized question generation from a set of options, utilizing the Fisher-Yates algorithm to shuffle the options pool
 */
export const useQuestionGenerator = (optionSet: string[]) => {
  const poolRef = useRef<string[]>(shuffle(optionSet));

  useEffect(() => {
    poolRef.current = shuffle(optionSet);
  }, [optionSet]);

  const generateQuestion = useCallback((): Question => {
    if (poolRef.current.length === 0) {
      poolRef.current = shuffle(optionSet);
    }

    const answer = poolRef.current.pop();

    if (!answer) {
      throw new Error('Cannot generate question from empty optionSet');
    }

    const root = randomInt(MIN_MIDI, MAX_MIDI);

    return { root, answer, selected: undefined };
  }, [optionSet]);

  return { generateQuestion };
};
