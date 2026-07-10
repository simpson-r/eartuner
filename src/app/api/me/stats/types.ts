
export interface QuestionMeta {
  expected: string;
  correct: boolean;
}

export interface AccuracyStats {
  expected: string;
  correct: number;
  incorrect: number;
}

export interface RowData {
  total: number;
  accuracy: number;
}

export const exerciseTypes = ['Interval', 'Chord', 'Scale', 'ScaleDegree'] as const;

export type ExerciseTypeKey = (typeof exerciseTypes)[number];

export type ExerciseMeta = QuestionMeta[];

export type AccuracyStatsMap = Partial<
  Record<ExerciseTypeKey, Record<string, AccuracyStats>>
>;

export type AccuracyMapResult = Record<ExerciseTypeKey, RowData[]>;