/**
 * Normalizes a Date object by stripping away all time components (hours, minutes,
 * seconds, milliseconds), returning a snapshot positioned at local midnight.
 */
const startOfDay = (date: Date): Date => {
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
