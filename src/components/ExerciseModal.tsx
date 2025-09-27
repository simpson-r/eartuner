"use client";

import { useState } from "react";

import {
  Button,
  CheckboxGroup,
  CloseButton,
  Dialog,
  Field,
  Fieldset,
  Input,
  Text,
  Stack,
} from "@chakra-ui/react";
import { type ExerciseType } from "@prisma/client";

import { Checkbox } from "@/components/ui/checkbox";
import { Dropdown } from "@/components/ui/dropdown";
import { exerciseConfigs } from "@/utils/exercises";
import { CollectionConfig, CreateExerciseBody } from "@/utils/types";

// const optionsConfig = [
//   {
//     control: "checkbox",
//   },
// ];
const QUESTION_MIN = 2;
const QUESTION_MAX = 100;

/**
 * This component displays a modal for configuring a custom ear training exercise.
 */
export const ExerciseModal = ({
  isLoading = false,
  isOpen,
  type,
  onCreate,
  onClose,
}: {
  isLoading?: boolean;
  isOpen: boolean;
  type: ExerciseType;
  onCreate: (exerciseData: CreateExerciseBody) => void;
  onClose: VoidFunction;
}) => {
  const { primary, secondary, showAutoProceed, showFixedRoot } =
    exerciseConfigs[type];

  const [formValues, setFormValues] = useState<Record<string, unknown>>({
    [primary.key]: primary.default,
    ...(secondary && { [secondary.key]: secondary.default }),
    numQuestions: QUESTION_MIN,
    showAutoProceed: false,
    showFixedRoot: false,
  });

  /* handlers */
  const handleSubmit = async (e: React.FormEvent<HTMLDivElement>) => {
    e.preventDefault();
    const { numQuestions, ...rest } = formValues;

    await onCreate({
      name: primary.label,
      type,
      numQuestions: numQuestions as number,
      settings: { ...rest },
    });
  };

  const handleFieldChange = (key: string, val: unknown) =>
    setFormValues((prev) => prev && { ...prev, [key]: val });

  const handleCheckboxChange = (
    key: string,
    itemKey: string,
    checked: boolean
  ) => {
    const values = (formValues?.[key] ?? []) as string[];
    if (checked) {
      handleFieldChange(key, [...(values as string[]), itemKey]);
      return;
    }

    const checkboxes = values?.filter((val) => val !== itemKey);
    handleFieldChange(key, checkboxes);
  };

  /* render */
  const renderControl = (config: CollectionConfig) => {
    switch (config.control) {
      case "checkbox":
        return (
          <Fieldset.Root>
            <Fieldset.Legend fontSize="sm"></Fieldset.Legend>
            <Fieldset.Content>
              <CheckboxGroup default={[config.default]}>
                {config.list.items.map((item) => (
                  <Checkbox
                    key={item.value}
                    label={item.label}
                    checked={formValues?.[item.value] as boolean}
                    onCheckedChange={(checked) => {
                      handleCheckboxChange(config.key, item.value, checked);
                    }}
                  />
                ))}
              </CheckboxGroup>
            </Fieldset.Content>
          </Fieldset.Root>
        );
      case "select":
        return (
          <Dropdown
            collection={config.list}
            label={config.label}
            value={
              (formValues?.[config.key] as string) ?? (config.default || "")
            }
            onValueChange={(value) => {
              handleFieldChange(config.key, value);
            }}
          />
        );
    }
  };

  return (
    <Dialog.Root placement="center" open={isOpen} lazyMount>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content as="form" onSubmit={handleSubmit} rounded="2xl">
          <Dialog.Header>
            <Dialog.Title>Start new exercise</Dialog.Title>
          </Dialog.Header>
          <Dialog.CloseTrigger asChild>
            <CloseButton size="sm" onClick={onClose} />
          </Dialog.CloseTrigger>
          <Dialog.Body>
            <Stack gap={4}>
              {/* "primary" control */}
              {renderControl(primary)}
              {/* no. of questions input */}
              <Field.Root>
                <Field.Label>Questions</Field.Label>
                <Input
                  type="number"
                  min={QUESTION_MIN}
                  max={QUESTION_MAX}
                  value={(formValues.numQuestions as number) || QUESTION_MIN}
                  onChange={(e) =>
                    handleFieldChange("numQuestions", e.target.value)
                  }
                  required
                />
              </Field.Root>
              {/* "secondary" control */}
              {secondary && renderControl(secondary)}
              {/* option checkboxes */}
              <Text fontWeight="medium">Options</Text>
              {showFixedRoot && (
                <Checkbox
                  label="Fixed root"
                  description="(start with the same note for every interval)"
                  checked={formValues.fixedRoot as boolean}
                  onCheckedChange={(checked) => {
                    handleFieldChange("fixedRoot", checked);
                  }}
                />
              )}
              {showAutoProceed && (
                <Checkbox
                  label="Auto-proceed"
                  description="(proceed to the next question after correct answer)"
                  checked={formValues.autoProceed as boolean}
                  onCheckedChange={(checked) => {
                    handleFieldChange("autoProceed", checked);
                  }}
                />
              )}
            </Stack>
          </Dialog.Body>
          <Dialog.Footer>
            {/* form footer */}
            <Dialog.ActionTrigger asChild>
              <Button variant="outline" rounded="md" onClick={onClose}>
                Cancel
              </Button>
            </Dialog.ActionTrigger>
            <Button
              type="submit"
              rounded="md"
              loading={isLoading}
              bgColor="cobalt.500"
            >
              Start exercise
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
};
