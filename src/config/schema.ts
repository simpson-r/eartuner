import { z } from 'zod';

import {
  DEFAULT_QUESTION_COUNT,
  QUESTION_MAX,
  QUESTION_MIN,
} from '../utils/constants';
import { chords, intervals, scaleDegrees, scales } from './theory';

const CHORD_PLAYBACKS = ['root', 'first', 'second', 'third'] as const;
const INTERVAL_DIRECTION = ['asc', 'des', 'asc-des', 'harmonic'] as const;
const SCALE_DIRECTION = ['asc', 'des'] as const;

export const exerciseConfigSchema = z
  .object({
    type: z.enum(['Interval', 'Chord', 'Scale', 'ScaleDegree']),
    items: z.array(z.string()).min(1).max(20),
    playback: z.string().optional().default('asc'),
    numQuestions: z.coerce
      .number()
      .int()
      .min(QUESTION_MIN)
      .max(QUESTION_MAX)
      .optional()
      .default(DEFAULT_QUESTION_COUNT),
  })
  .superRefine((data, ctx) => {
    let validKeys: string[] = [];
    if (data.type === 'Chord') validKeys = Object.keys(chords);
    if (data.type === 'Interval') validKeys = Object.keys(intervals);
    if (data.type === 'Scale') validKeys = Object.keys(scales);
    if (data.type === 'ScaleDegree') validKeys = Object.keys(scaleDegrees);
    const hasInvalidItems = data.items.some(
      (item) => !validKeys.includes(item),
    );
    if (hasInvalidItems) {
      ctx.addIssue({
        code: 'custom',
        path: ['items'],
        message: `One or more selected items are invalid for type: ${data.type}`,
      });
    }

    switch (data.type) {
      case 'Chord':
        if (!CHORD_PLAYBACKS.includes(data.playback as never)) {
          ctx.addIssue({
            code: 'custom',
            path: ['playback'],
            message: `Chord playback must be one of: ${CHORD_PLAYBACKS.join(', ')}`,
          });
        }
        break;
      case 'Interval':
        if (!INTERVAL_DIRECTION.includes(data.playback as never)) {
          ctx.addIssue({
            code: 'custom',
            path: ['playback'],
            message: `${data.type} playback must be 'asc', 'des', 'asc-des', or 'harmonic'`,
          });
        }
        break;
      case 'Scale':
        if (!SCALE_DIRECTION.includes(data.playback as never)) {
          ctx.addIssue({
            code: 'custom',
            path: ['playback'],
            message: `${data.type} playback must be 'asc' or 'des'`,
          });
        }
        break;
    }
  });
