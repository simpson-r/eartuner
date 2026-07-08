import { useEffect, useMemo, useReducer, useRef, useState } from 'react';
import * as Tone from 'tone';
import { ExerciseType } from '@prisma/client';

import * as playback from '@/audio/playback';
import { ensureAudioReady, loadInstruments } from '@/audio/instruments';
import {
  EXERCISE_THEORY_CONFIG,
  chords,
  intervals,
  scaleDegrees,
  scales,
} from '@/config/theory';
import { useHistory } from '@/hooks/use-history';
import { usePreferences } from '@/hooks/use-preferences';
import { useQuestionGenerator } from './use-question-generator';
import {
  ChordInversion,
  ExerciseConfig,
  ExerciseMetadata,
  PlaybackDirection,
  Question,
} from '@/features/exercise/types';

/**
 * TYPES & INTERFACES
 */
export interface ExercisePlayerState {
  total: number;
  index: number;
  correct: number;
  question?: Question;
  finished: boolean;
  playing: boolean;
  duration: number;
  meta: ExerciseMetadata[];
}

type Action =
  | { type: 'LOAD_QUESTION'; payload: Question }
  | { type: 'SUBMIT'; payload: string }
  | { type: 'NEXT' }
  | { type: 'PLAY_SOUND'; payload: boolean }
  | { type: 'RESET'; payload: { total: number } }
  | { type: 'END_EXERCISE'; payload: { duration: number } };

const CORRECT_DEST = '/sounds/correct.mp3';
const WRONG_DEST = '/sounds/wrong.mp3';

const initialState: ExercisePlayerState = {
  total: 1,
  index: 0,
  correct: 0,
  question: undefined,
  finished: false,
  playing: false,
  duration: 0,
  meta: [],
};

/* REDUCER */
export function reducer(
  state: ExercisePlayerState,
  action: Action,
): ExercisePlayerState {
  switch (action.type) {
    case 'LOAD_QUESTION':
      return {
        ...state,
        question: { ...action.payload, selected: undefined },
      };
    case 'SUBMIT': {
      const q = state.question;
      if (!q) return state;

      const selected = action.payload;
      const isCorrect = selected === q.answer;

      return {
        ...state,
        meta: [
          ...state.meta,
          { answered: selected, expected: q.answer, correct: isCorrect },
        ],
        correct: state.correct + (isCorrect ? 1 : 0),
        question: { ...q, selected },
      };
    }
    case 'NEXT':
      return {
        ...state,
        index: state.index + 1,
        question: undefined,
      };
    case 'PLAY_SOUND':
      return {
        ...state,
        playing: action.payload,
      };
    case 'RESET':
      return {
        ...initialState,
        total: action.payload.total,
      };
    case 'END_EXERCISE':
      return {
        ...state,
        question: undefined,
        finished: true,
        duration: action.payload.duration,
      };
    default:
      return state;
  }
}

/**
 * This hook handles state transition for an exercise as well as triggers the audio engine
 */
export const useExercisePlayer = (
  config: ExerciseConfig,
  isLoggedIn: boolean,
) => {
  const { type, items, numQuestions } = config;
  const { labels } = EXERCISE_THEORY_CONFIG[type];
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    total: numQuestions,
  });

  const [instrument, setInstrument] = useState<Tone.Sampler>();

  const { preferences } = usePreferences();
  const { generateQuestion } = useQuestionGenerator(items);
  const { create, newAttempt } = useHistory();

  const durationRef = useRef(0);
  const hasPostedAttempt = useRef(false);
  const correctPlayerRef = useRef<Tone.Player | null>(null);
  const wrongPlayerRef = useRef<Tone.Player | null>(null);

  const options = items.map((item) => ({
    label: labels[item as keyof typeof labels],
    value: item,
  }));

  /**
   * EFFECTS
   */

  // load next question
  useEffect(() => {
    if (!state.question && !state.finished) {
      dispatch({ type: 'LOAD_QUESTION', payload: generateQuestion() });
    }
  }, [generateQuestion, state.question, state.finished]);

  // load feedback sound players
  useEffect(() => {
    correctPlayerRef.current = new Tone.Player(CORRECT_DEST).toDestination();
    wrongPlayerRef.current = new Tone.Player(WRONG_DEST).toDestination();

    return () => {
      correctPlayerRef.current?.dispose();
      wrongPlayerRef.current?.dispose();
    };
  }, [preferences?.lessonSoundEffects]);

  // play feedback sounds
  useEffect(() => {
    if (state.meta.length === 0 || !preferences?.lessonSoundEffects) return;
    const lastResult = state.meta[state.meta.length - 1];

    const playFeedbackSound = async () => {
      if (Tone.getContext().state !== 'running') return;

      const player = lastResult.correct
        ? correctPlayerRef.current
        : wrongPlayerRef.current;

      if (!player || !player.loaded) return;

      try {
        player.stop();
        player.start();
      } catch (error) {
        console.error('Failed to play feedback sound:', error);
      }
    };

    playFeedbackSound();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.meta]);

  // save results on exercise completion
  useEffect(() => {
    const saveExercise = async () => {
      await create({
        exerciseType: type,
        numQuestions: state.total,
        score: (state.correct / state.total) * 100,
        durationSec: durationRef.current,
        meta: state.meta,
      });
    };

    if (state.finished && isLoggedIn && !hasPostedAttempt.current) {
      hasPostedAttempt.current = true;
      saveExercise();
    }
  }, [
    state.finished,
    isLoggedIn,
    state.total,
    state.correct,
    state.meta,
    type,
    create,
  ]);

  // timer
  useEffect(() => {
    if (state.finished) return;

    const timer = setInterval(() => {
      durationRef.current += 1;
    }, 1000);

    return () => clearInterval(timer);
  }, [state.finished]);

  // audio context initialization
  useEffect(() => {
    const resume = async () => {
      await Tone.start();
      cleanup();
    };

    const cleanup = () => {
      window.removeEventListener('pointerdown', resume);
      window.removeEventListener('keydown', resume);
    };

    const initAudio = async () => {
      window.addEventListener('pointerdown', resume);
      window.addEventListener('keydown', resume);

      const loadedInstrument = await loadInstruments(
        preferences?.defaultInstrument || 'Piano',
      );
      setInstrument(loadedInstrument);
    };

    initAudio();
    return cleanup;
  }, [preferences?.defaultInstrument]);

  /**
   * ACTIONS
   */
  const playSound = async () => {
    if (!state.question || !instrument) return;

    await ensureAudioReady();
    const { root, answer } = state.question;

    dispatch({ type: 'PLAY_SOUND', payload: true });
    try {
      switch (type) {
        case ExerciseType.Chord:
          await playback.playChord(
            instrument,
            root,
            answer as keyof typeof chords,
            config.playback as ChordInversion,
          );
          break;
        case ExerciseType.Scale:
          await playback.playScale(
            instrument,
            root,
            answer as keyof typeof scales,
            config.playback as PlaybackDirection,
          );
          break;
        case ExerciseType.ScaleDegree:
          await playback.playScaleDegree(
            instrument,
            root,
            answer as unknown as keyof typeof scaleDegrees,
          );
          break;
        case ExerciseType.Interval:
          await playback.playInterval(
            instrument,
            root,
            answer as keyof typeof intervals,
            config.playback as PlaybackDirection,
          );
          break;
      }
    } finally {
      dispatch({ type: 'PLAY_SOUND', payload: false });
    }
  };

  console.log({ playing: state.playing, instrument });

  /**
   * DERIVED VARIABLES
   */
  const progress = useMemo(() => {
    return Math.ceil((state.index / state.total) * 100);
  }, [state.index, state.total]);

  const status = useMemo(() => {
    const selected = state.question?.selected;
    if (selected == null) return 'idle';
    return selected === state.question?.answer ? 'correct' : 'wrong';
  }, [state.question?.selected, state.question?.answer]);

  return {
    state,
    exerciseType: type,
    duration: durationRef.current,
    options,
    status,
    attempt: newAttempt,
    progress,
    canPlayAudio: !!instrument && !state.playing,
    dispatch,
    playSound,
  };
};
