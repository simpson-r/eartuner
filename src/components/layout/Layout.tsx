import { Session } from "next-auth";
import React from "react";

import { Flex } from "@chakra-ui/react";

import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { Toaster } from "../ui/toaster";

const Layout = ({
  children,
  session,
}: React.PropsWithChildren<{ session: Session | null }>) => (
  <Flex direction="column" h="100vh" w="100vw">
    <Header session={session} />
    <Flex h="calc(100vh - 7rem)">{children}</Flex>
    <Footer />
    <Toaster />
  </Flex>
);

export default Layout;
