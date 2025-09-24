import { Button, Heading, HStack, Icon, Stack, Text } from "@chakra-ui/react";
import { FaArrowRight } from "react-icons/fa";

interface Props {
  label: string;
  description: string;
  icon: React.ReactElement;
  boxSize?: number;
  showButton?: boolean;
  onClick: VoidFunction;
}

/**
 * This component renders a home page block with a "Create Exercise" button that opens the flow for creating a new exercise.
 */
export const Block = ({
  description,
  label,
  icon,
  showButton = false,
  onClick,
}: Props) => {
  return (
    <Stack
      key={label}
      rounded="2xl"
      shadow="sm"
      bg="white"
      p={10}
      _hover={{ transform: "translateY(-2px)" }}
      transition="0.2s"
    >
      {/* heading + description */}
      <Stack alignItems="flex-start">
        <HStack>
          {icon}
          <Heading fontSize="xl">{label}</Heading>
        </HStack>
        <Text color="gray.600" mb={4} fontSize="sm">
          {description}
        </Text>
      </Stack>

      {/* play button */}
      {showButton && (
        <Stack justifyContent="center" align="center">
          <Button
            variant="outline"
            justifyContent="flex-start"
            w="1/2.5"
            onClick={onClick}
          >
            Create {label.toLowerCase()} exercise
            <Icon as={FaArrowRight} size="xs" />
          </Button>
        </Stack>
      )}
    </Stack>
  );
};
