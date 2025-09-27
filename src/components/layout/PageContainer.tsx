import { VStack, type StackProps } from "@chakra-ui/react";

import React from "react";

const PageContainer = (props: StackProps) => (
  <VStack
    w="100%"
    flex="1"
    mx="auto"
    py={10}
    px={32}
    {...props}
  />
);

export default PageContainer;
