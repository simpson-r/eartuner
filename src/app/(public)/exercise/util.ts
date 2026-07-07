import { exerciseConfigSchema } from "@/config/schema";

/**
 * Parses and validates an encoded exercise configuration.
 *
 * @param config - Base64-encoded exercise configuration.
 */
export const parseExerciseConfig = (config?: string) => {
  if (!config) return null;

  try {
    const decodedConfig = JSON.parse(atob(config));
    return exerciseConfigSchema.parse(decodedConfig);
  } catch {
    return null;
  }
};