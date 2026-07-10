'use client';
import { motion } from 'motion/react';
import { useRouter } from 'next/navigation';

import { Box, Center, Grid } from '@chakra-ui/react';

import { Layout } from '@/components/layout/Layout';
import { EXERCISE_THEORY_CONFIG } from '@/config/theory';
import { useExercisePlayer } from '@/features/exercise/hooks/use-exercise-player';
import { PlayerHeader } from '@/features/exercise/components/PlayerHeader';
import { PlayerScreen } from '@/features/exercise/components/PlayerScreen';
import { CompletionScreen } from '@/features/exercise/components/CompletionScreen';
import { PlayerFooter } from '@/features/exercise/components/PlayerFooter';
import { ExerciseConfig } from '@/features/exercise/types';

const MotionBox = motion.create(Box);
/**
 * This component manages and renders the UI for the ear-training exercises,  dynamically configuring
 *  playback engine state, tracking question progress, answers, and rendering audio
 */
export const PlayerPage = ({
  config,
  isLoggedIn,
}: {
  config: ExerciseConfig;
  isLoggedIn: boolean;
}) => {
  const router = useRouter();

  const {
    state,
    status,
    options,
    progress,
    duration,
    exerciseType,
    canPlayAudio,
    dispatch,
    playSound,
  } = useExercisePlayer(config, isLoggedIn);

  const { question, index, total, finished } = state;
  const { labels } = EXERCISE_THEORY_CONFIG[config.type];

  /* DERVIED VARS */
  const answered = status !== 'idle';
  const correct = status === 'correct';
  const answer = question?.answer;
  const answerLabel = answer ? labels[answer as keyof typeof labels] : null;
  const showFooter = answered || (finished && isLoggedIn);

  /* HANDLERS */
  const handlePlayClick = () => playSound();

  const handleResponseClick = (value: string) =>
    dispatch({ type: 'SUBMIT', payload: value });

  const handleContinueClick = () => {
    if (finished) {
      router.push(isLoggedIn ? '/dashboard' : '/');
    } else {
      const hasNext = index + 1 < total;
      dispatch(hasNext ? { type: 'NEXT' } : { type: 'END_EXERCISE' });
    }
  };

  console.log({ duration });

  return (
    <Grid
      minH="100dvh"
      w="full"
      templateRows={
        finished
          ? {
              base: 'minmax(0, 1fr) auto',
              md: !isLoggedIn ? 'minmax(0, 1fr) auto' : 'minmax(0, 1fr) 96px',
            }
          : { base: 'auto 1fr auto', md: 'auto 1fr 96px' }
      }
    >
      {/* header */}
      {!finished && (
        <PlayerHeader
          progress={progress}
          curQuestion={index}
          totalQuestions={total}
        />
      )}
      <Layout.PageContainer overflowY="auto" justify="center" p={2}>
        {/* main area */}
        {!finished ? (
          <PlayerScreen
            exerciseType={exerciseType}
            answered={answered}
            correct={correct}
            options={options}
            question={question}
            enablePlayButton={canPlayAudio}
            handlePlayClick={handlePlayClick}
            handleResponseClick={handleResponseClick}
          />
        ) : (
          <Center minH="100%">
            <CompletionScreen
              duration={duration}
              state={state}
              isLoggedIn={isLoggedIn}
            />
          </Center>
        )}
      </Layout.PageContainer>

      {/* footer */}
      <MotionBox
        initial={false}
        animate={{
          opacity: showFooter ? 1 : 0,
          y: showFooter ? 0 : 12,
          pointerEvents: showFooter ? 'auto' : 'none',
        }}
        transition={{ duration: 0.18, ease: 'easeIn' }}
        minH={answered || (finished && isLoggedIn) ? '96px' : '0px'}
      >
        {showFooter && (
          <PlayerFooter
            answer={answerLabel}
            finished={finished}
            correct={correct}
            onContinueClick={handleContinueClick}
          />
        )}
      </MotionBox>
    </Grid>
  );
};
