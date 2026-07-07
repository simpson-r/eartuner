'use client';

export const getPerformanceCTA = (score: number) => {
  switch (true) {
    case score === 100:
      return 'Perfect! Your ear is dialed in.';
    case score >= 80:
      return 'Excellent! Your ear is dialed in.';
    case score >= 60:
      return 'Nice work! Your ear is improving.';
    default:
      return "Keep going! It's all about repetition.";
  }
};

export const getAnswerFeedback = (correct: boolean, answer: string) => {
  return {
    heading: correct ? 'Awesome!' : 'Incorrect',
    description: correct ? (
      'Keep up the good work'
    ) : (
      <>
        Not quite — the correct answer is <b>{answer}</b>
      </>
    ),
  };
};

export const timeFormat = (sec: number) => {
  if (sec === null) return '--';
  const hStart = 11;
  const mStart = 14;
  const hrs = Math.floor(sec / 3600);
  const mins = Math.floor((sec % 3600) / 60);
  return new Date(sec * 1000)
    .toISOString()
    .slice(hrs > 0 ? hStart : mins > 10 ? mStart : mStart + 1, 19);
};
