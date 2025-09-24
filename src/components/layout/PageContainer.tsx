import { VStack, type StackProps } from "@chakra-ui/react";

import React from "react";

const PageContainer = (props: StackProps) => (
  <VStack
    width="100%"
    maxW="container.lg"
    flex="1"
    mx="auto"
    py={10}
    px={24}
    {...props}
  />
);

export default PageContainer;
