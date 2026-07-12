'use client';

import { useState } from 'react';

import {
  createListCollection,
  Dialog,
  Field,
  Fieldset,
  NumberInput,
  Stack,
} from '@chakra-ui/react';
import { type ExerciseType } from '@prisma/client';

import { ElevatedButton } from '@/components/ElevatedButton';
import { Dropdown } from '@/components/ui/dropdown';
import { exerciseConfigs } from '@/features/dashboard/utils';
import { EXERCISE_THEORY_CONFIG } from '@/config/theory';
import {
  DEFAULT_QUESTION_COUNT,
  QUESTION_MAX,
  QUESTION_MIN,
} from '@/utils/constants';
import {
  CollectionConfig,
  PlaybackMode,
  ExerciseConfig,
  ExerciseFormState,
} from '@/features/exercise/types';
import { Checkbox } from '@/components/ui/checkbox';

function getOptionSet(
  options: Record<string, string[]>,
  selected: string,
): string[] {
  const optionSet = options[selected];

  if (!optionSet) {
    throw new Error(`Invalid option set requested: "${selected}"`);
  }

  return optionSet;
}

function getDefaultSettings(
  primary: CollectionConfig,
  secondary: CollectionConfig,
): ExerciseFormState {
  return {
    selected: primary.defaultValue,
    playback: secondary?.defaultValue || '',
    numQuestions: DEFAULT_QUESTION_COUNT,
    fixedRoot: false,
    autoProceed: false,
    shortcut: false,
  };
}

type AdvancedOptions = 'fixedRoot' | 'autoProceed' | 'shortcut';
const ADVANCED_OPTIONS_MAP = [
  {
    label: 'Fixed root',
    key: 'fixedRoot',
  },
  {
    label: 'Auto proceed',
    key: 'autoProceed',
  },
  {
    label: 'Keyboard shortcuts',
    key: 'shortcut',
  },
];

/**
 * This component displays a modal for configuring a custom ear training exercise.
 */
export const ExerciseForm = ({
  exerciseType,

  onCreate,
  onClose,
}: {
  exerciseType: ExerciseType;
  onCreate: (config: ExerciseConfig) => void;
  onClose: VoidFunction;
}) => {
  const { primary, secondary } = exerciseConfigs[exerciseType];
  const options = EXERCISE_THEORY_CONFIG[exerciseType].groups;

  const [settings, setSettings] = useState<ExerciseFormState>(() =>
    // @ts-expect-error fix later on
    getDefaultSettings(primary, secondary),
  );

  /* HANDLERS */
  const updateSetting = <K extends keyof ExerciseFormState>(
    key: K,
    value: ExerciseFormState[K],
  ) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLDivElement>) => {
    e.preventDefault();

    const {
      numQuestions,
      playback,
      selected,
      autoProceed,
      fixedRoot,
      shortcut,
    } = settings;
    const optionSet = getOptionSet(options, selected);

    await onCreate({
      type: exerciseType,
      numQuestions,
      items: optionSet,
      playback: playback as PlaybackMode,
      autoProceed,
      fixedRoot,
      shortcut,
    });

    onClose();
  };

  /* CONTROLS */
  const renderDropdown = (config: CollectionConfig) => {
    const value = settings[config.key as keyof ExerciseFormState];

    let finalCollection = config.list;
    if (settings.selected === 'triad' && config.key === 'playback') {
      const filteredItems = config.list.items.filter(
        (i) => i.value !== 'third',
      );
      finalCollection = createListCollection({ items: filteredItems });
    }

    return (
      <Dropdown
        collection={finalCollection}
        size="sm"
        label={config.label}
        value={[value || config.defaultValue]}
        onValueChange={(e) =>
          updateSetting(config.key as keyof ExerciseFormState, e.value[0])
        }
      />
    );
  };

  /* RENDER */
  return (
    <>
      <Dialog.Body as="form" onSubmit={handleSubmit} id="exercise-config-form">
        <Stack gap={4}>
          {/* "primary" control */}
          {renderDropdown(primary)}
          {/* no. of questions input */}
          <Field.Root>
            <Field.Label color="fg"> Number of questions</Field.Label>
            <NumberInput.Root
              size="md"
              defaultValue="10"
              min={QUESTION_MIN}
              max={QUESTION_MAX}
              onValueChange={(e) =>
                updateSetting('numQuestions', e.valueAsNumber)
              }
              required
            >
              <NumberInput.Control />
              <NumberInput.Input />
            </NumberInput.Root>
            <Field.HelperText>{`Between ${QUESTION_MIN} and ${QUESTION_MAX} questions`}</Field.HelperText>
          </Field.Root>

          {/* "secondary" control */}
          {secondary && renderDropdown(secondary)}
          {/* advanced options */}
          <Fieldset.Root>
            <Fieldset.Legend fontSize="sm">Advanced options</Fieldset.Legend>
            {ADVANCED_OPTIONS_MAP.map(({ label, key }) => (
              <Checkbox
                label={label}
                checked={settings?.[key as AdvancedOptions] || false}
                onCheckedChange={(e) =>
                  updateSetting(key as AdvancedOptions, !!e.checked)
                }
              />
            ))}
          </Fieldset.Root>
        </Stack>
      </Dialog.Body>
      <Dialog.Footer justifyContent="center">
        <ElevatedButton
          type="submit"
          form="exercise-config-form"
          w="11/12"
          surfaceColor="cobalt.500"
          shadowColor="cobalt.600"
          showShimmer
        >
          Start exercise
        </ElevatedButton>
      </Dialog.Footer>
    </>
  );
};
