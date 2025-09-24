"use client";

import {
  Button,
  CloseButton,
  Dialog,
  Field,
  Icon,
  Input,
  Text,
  Stack,
} from "@chakra-ui/react";
import { useState } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { Dropdown } from "@/components/ui/dropdown";
import { Exercise } from "@/lib/types";
import { exerciseConfigurations } from "@/utils/exercises";
import { FaPlay } from "react-icons/fa";

/**
 * This component displays a modal for configuring a custom ear training exercise.
 */
export const ExerciseModal = ({
  isOpen,
  type,
  onClose,
}: {
  isOpen: boolean;
  type: Exercise;
  onClose: VoidFunction;
}) => {
  const [questionsNum, setQuestionsNum] = useState(5);

  const config = exerciseConfigurations[type];
  const { collection, showAutoProceed, showFixedRoot, subCollection } = config;

  return (
    <Dialog.Root placement="center" open={isOpen} lazyMount>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content rounded="2xl">
          {/* header  */}
          <Dialog.Header>
            <Dialog.Title>Start new exercise</Dialog.Title>
          </Dialog.Header>
          <Dialog.CloseTrigger asChild>
            <CloseButton size="sm" onClick={onClose} />
          </Dialog.CloseTrigger>
          {/* body */}
          <Dialog.Body>
            <Stack as="form" onSubmit={async (e) => e.preventDefault()} gap={4}>
              {/* "exercise type" dropdown */}
              <Dropdown
                collection={collection.list}
                label={collection.label}
                placeholder={collection?.placeholder || ""}
              />
              {/* no. of questions input */}
              <Field.Root>
                <Field.Label>Questions</Field.Label>
                <Input
                  type="number"
                  min="5"
                  max="100"
                  value={questionsNum}
                  onChange={(e) => {
                    const val = parseInt(e.currentTarget.value);
                    setQuestionsNum((val && val >= 5 && val) || 5);
                  }}
                  required
                />
              </Field.Root>
              {/* "exercise type options" dropdown OR checkbox */}
              {subCollection &&
                (subCollection?.placeholder ? (
                  <Dropdown
                    collection={subCollection.list}
                    label={subCollection.label}
                    placeholder={subCollection.placeholder}
                  />
                ) : (
                  <>
                    <Text fontWeight="medium">{subCollection.label}</Text>
                    {subCollection.list.items.map((item) => (
                      <Checkbox label={item.label} />
                    ))}
                  </>
                ))}
              {/* option checkboxes */}
              <Text fontWeight="medium">Options</Text>
              {showFixedRoot && (
                <Checkbox
                  label="Fixed root"
                  description="(start with the same note for every interval)"
                />
              )}
              {showAutoProceed && (
                <Checkbox
                  label="Auto-proceed"
                  description="(proceed to the next question after correct answer)"
                />
              )}
            </Stack>
          </Dialog.Body>
          {/* form footer */}
          <Dialog.Footer>
            <Dialog.ActionTrigger asChild>
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </Dialog.ActionTrigger>
            <Button>
              Create & Play
              <Icon size="xs !important" as={FaPlay}></Icon>
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
};
