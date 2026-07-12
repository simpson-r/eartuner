import { useEffect, useRef } from 'react';
import * as Tone from 'tone';
import { ExerciseMetadata } from '../types';

const CORRECT_DEST = '/sounds/correct.mp3';
const WRONG_DEST = '/sounds/wrong.mp3';

export const useFeedbackSounds = (
  latestResult: ExerciseMetadata | undefined,
  enabled: boolean,
) => {
  const correctPlayerRef = useRef<Tone.Player | null>(null);
  const wrongPlayerRef = useRef<Tone.Player | null>(null);

  useEffect(() => {
    const correctPlayer = new Tone.Player(CORRECT_DEST).toDestination();
    const wrongPlayer = new Tone.Player(WRONG_DEST).toDestination();

    correctPlayerRef.current = correctPlayer;
    wrongPlayerRef.current = wrongPlayer;

    return () => {
      correctPlayer.dispose();
      wrongPlayer.dispose();
      correctPlayerRef.current = null;
      wrongPlayerRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!enabled || !latestResult) return;
    if (Tone.getContext().state !== 'running') return;

    const player = latestResult.correct
      ? correctPlayerRef.current
      : wrongPlayerRef.current;

    if (!player?.loaded) return;

    try {
      player.stop();
      player.start();
    } catch (error) {
      console.error('Failed to play feedback sound', error);
    }
  }, [enabled, latestResult]);
};
