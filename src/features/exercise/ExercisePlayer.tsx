'use client';
import { useRouter } from 'next/navigation';

import { Box, Flex } from '@chakra-ui/react';

import { useExercisePlayer } from '@/features/exercise/hooks/use-exercise-player';
import { EXERCISE_THEORY_CONFIG } from '@/config/theory';
import { CompletionScreen } from './components/CompletionScreen';
import { PlayerFooter } from './components/PlayerFooter';
import { PlayerHeader } from './components/PlayerHeader';
import { PlayerScreen } from './components/PlayerScreen';
import { ClientPreferences, ExerciseConfig } from '@/utils/types';

/**
 * This component manages and renders the UI for the ear-training exercises,  dynamically configuring
 *  playback engine state, tracking question progress, answers, and rendering audio
 */
export const ExercisePlayer = ({
  config,
  isLoggedIn,
}: {
  config: ExerciseConfig;
  isLoggedIn: boolean;
  preferences?: ClientPreferences;
}) => {
  const router = useRouter();
  const { state, status, options, progress, actions, duration, dispatch } =
    useExercisePlayer(config, isLoggedIn);

  const { question, index, total, playing, finished } = state;
  const { labels } = EXERCISE_THEORY_CONFIG[config.type];

  const answered = status !== 'idle';
  const correct = status === 'correct';
  const answer = question?.answer;
  const answerLabel = answer ? labels[answer as keyof typeof labels] : null;

  /* HANDLERS */
  const handlePlayClick = () => actions.playSound();

  const handleResponseClick = (value: string) =>
    dispatch({ type: 'SUBMIT', payload: value });

  const handleContinueClick = () => {
    if (finished) {
      router.push(isLoggedIn ? '/dashboard' : '/');
    } else {
      const hasNext = index + 1 < total;
      dispatch(
        hasNext
          ? { type: 'NEXT' }
          : { type: 'END_EXERCISE', payload: { duration } },
      );
    }
  };

  return (
    <Flex w="full" direction="column" minH="100vh">
      {/* header */}
      {!finished && (
        <PlayerHeader
          progress={progress}
          curQuestion={index}
          totalQuestions={total}
        />
      )}

      {/* main area */}
      <Flex flex={1} align="center" justify="center">
        {!finished ? (
          <PlayerScreen
            answered={answered}
            correct={correct}
            options={options}
            question={question}
            playing={playing}
            handlePlayClick={handlePlayClick}
            handleResponseClick={handleResponseClick}
          />
        ) : (
          <CompletionScreen state={state} isLoggedIn={isLoggedIn} />
        )}
      </Flex>

      {/* footer */}

      {!(!isLoggedIn && finished) && (
        <Box minH={28}>
          <PlayerFooter
            answer={answerLabel}
            answered={answered}
            finished={finished}
            correct={correct}
            onContinueClick={handleContinueClick}
          />
        </Box>
      )}
    </Flex>
  );
};
