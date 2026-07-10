'use client';

import { randomItem } from '../../../utils';

const SUCCESS_HEADINGS = [
  'Awesome!',
  'Nice!',
  'Great job!',
  'Excellent!',
  'Correct!',
  'Well done!',
];

const SUCCESS_MESSAGES = [
  'Keep up the good work.',
  'Your ear is getting stronger.',
  'Great listening.',
  'You nailed that one.',
  'One step closer to mastery.',
];

const FAILURE_HEADINGS = ['Almost', 'Incorrect'];

/**
 * Returns a feedback message based on the user's score.
 *
 * @param score - Percentage score (0–100).
 */
export const getPerformanceCTA = (score: number) => {
  switch (true) {
    case score === 100:
      return "Perfect! You're locked in.";
    case score >= 80:
      return "Excellent! You're developing a great ear.";
    case score >= 60:
      return 'Nice work! Your ear is improving.';
    default:
      return "Keep going! It's all about repetition.";
  }
};

/**
 * Returns the heading and description shown after answering a question.
 *
 * Displays encouragement for correct answers or reveals the correct
 * answer when the user is incorrect.
 *
 * @param correct - Whether the user's answer was correct.
 * @param answer - The correct answer to display when incorrect.
 */
export const getAnswerFeedback = (correct: boolean, answer: string) => {
  return {
    heading: correct
      ? randomItem(SUCCESS_HEADINGS)
      : randomItem(FAILURE_HEADINGS),
    description: correct ? (
      randomItem(SUCCESS_MESSAGES)
    ) : (
      <>
        Not quite — the correct answer is <b>{answer}</b>
      </>
    ),
  };
};

/**
 * Formats a duration in seconds as HH:MM:SS or MM:SS.
 *
 * Examples:
 *  - 65    -> 01:05
 *  - 3661  -> 01:01:01
 *
 * @param sec - Duration in seconds.
 */
export const formatDuration = (sec: number | null) => {
  if (sec === null) return '--';
  const hStart = 11;
  const mStart = 14;
  const hrs = Math.floor(sec / 3600);
  const mins = Math.floor((sec % 3600) / 60);
  return new Date(sec * 1000)
    .toISOString()
    .slice(hrs > 0 ? hStart : mins > 10 ? mStart : mStart + 1, 19);
};

/**
 * Formats a score as a number with at most two decimcal points
 *
 * Examples:
 *  - 92.3333    ->  92.33
 *  - 3.1415926  -> 3.14
 *
 * @param score
 */
export const formatScore = (score: number) => Math.round(score * 100) / 100;
