import { Session } from "next-auth";
import React from "react";

import { Flex } from "@chakra-ui/react";

import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

const Layout = ({
  children,
  session,
}: React.PropsWithChildren<{ session: Session | null }>) => (
  <Flex direction="column" h="100vh" w="100vw">
    <Header session={session} />
    {children}
    <Footer />
  </Flex>
);

export default Layout;
