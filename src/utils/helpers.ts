/**
 * EXERCISE PLAYER-RELATED HELPERS
 */

/**
 * Generates an array of numbers progressing from a start value up to,
 * but not including, a stop value.
 *
 * @param start - The beginning value of the sequence.
 * @param stop - The exclusive upper bound of the sequence.
 * @param step - The increment value between elements. Defaults to 1. Cannot be 0.
 * @returns An array containing the generated arithmetic sequence.
 * @throws Error if the step value is zero, which would cause an infinite loop.
 */
export const range = (start: number, stop: number, step = 1): number[] => {
  if (step === 0) {
    throw new Error('Step value cannot be zero.');
  }

  const length = Math.max(0, Math.ceil((stop - start) / step));
  return Array.from({ length }, (_, index) => start + index * step);
};

/**
 * Utilizes the Fisher-Yates algorithm to shuffle an array of options
 */
export const shuffle = (arr: string[]): string[] => {
  const newArr = [...arr];
  for (let i = newArr.length - 1; i >= 1; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
};

/**
 * DATE-RELATED HELPERS
 */

/**
 * Normalizes a Date object by stripping away all time components (hours, minutes,
 * seconds, milliseconds), returning a snapshot positioned at local midnight.
 *
 * @param date - The source Date object to normalize.
 * @returns A new Date instance locked to 00:00:00.000 local time.
 */
export const startOfDay = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

/**
 * Calculates the exact integer calendar days separating two dates.
 *
 * @param first - The baseline starting Date.
 * @param second - The target ending Date to compare against.
 * @returns The signed count of calendar days between the parameters (can be negative).
 */
export const daysBetween = (first: Date, second: Date): number => {
  const millisecondsPerDay = 1000 * 60 * 60 * 24;

  const startMs = startOfDay(first).getTime();
  const endMs = startOfDay(second).getTime();

  return Math.round((endMs - startMs) / millisecondsPerDay);
};
