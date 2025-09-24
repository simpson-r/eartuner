"use client";

import { Box, Button, Container, Stack, Text } from "@chakra-ui/react";
import { ReactNode } from "react";
import Link from "next/link";

const SocialButton = ({
  children,
  href,
}: {
  children: ReactNode;
  href: string;
}) => {
  return (
    <Button
      rounded="full"
      w={8}
      h={8}
      cursor="pointer"
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      transition="background 0.3s ease"
      asChild
    >
      <Link href={href} target="_blank">
        {" "}
        {children}
      </Link>
    </Button>
  );
};

export default function Footer() {
  return (
    <Box>
      <Container
        as={Stack}
        maxW="container.lg"
        gap={6}
        py={4}
        direction={{ base: "column", md: "row" }}
        alignItems={{ base: "center", md: "flex-end" }}
        justifyContent="center"
      >
        <Stack alignItems="center" direction="row" gap={4}>
          <Text fontSize="sm">
            <Link href="/terms">Terms and Privacy</Link>
          </Text>
          <Text fontSize="sm">
            <Link href="/faq">FAQ</Link>
          </Text>
          {/* <SocialButton href="mailto:support@photoshot.app">
            <MdAlternateEmail />
          </SocialButton> */}
          <Text display={{ base: "none", sm: "block" }} fontSize="sm">
            Made with ❤️ in Lisbon © 2025 EarTrainer+
          </Text>
        </Stack>
      </Container>
    </Box>
  );
}
