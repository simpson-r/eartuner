/**
 * EXERCISE PLAYER-RELATED HELPERS
 */

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
 * Returns a random string from an array of options
 */
export const randomItem = (arr: string[]) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

/**
 * DATE-RELATED HELPERS
 */

/**
 * Normalizes a Date object by stripping away all time components (hours, minutes,
 * seconds, milliseconds), returning a snapshot positioned at local midnight.
 */
export const startOfDay = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

/**
 * Calculates the exact integer calendar days separating two dates.
 */
export const daysBetween = (first: Date, second: Date): number => {
  const millisecondsPerDay = 1000 * 60 * 60 * 24;

  const startMs = startOfDay(first).getTime();
  const endMs = startOfDay(second).getTime();

  return Math.round((endMs - startMs) / millisecondsPerDay);
};
