import { ExerciseType } from "@prisma/client";

export type SelectedBreakdownType = ExerciseType | 'All';

export type BreakdownMap = Partial<
  Record<ExerciseType, { attempts: number; averageScore: string }>
>;
