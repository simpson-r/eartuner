"use client";

import { Box, Container, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";

export default function Footer() {
  return (
    <Box>
      <Container
        as={Stack}
        maxW="container.lg"
        gap={6}
        py={2}
        direction={{ base: "column", md: "row" }}
        alignItems={{ base: "center", md: "flex-end" }}
        justifyContent="center"
      >
        <Stack align="center" direction="row" gap={4} fontSize="xs">
          <Text>
            <Link href="/terms">Terms and Privacy</Link>
          </Text>
          <Text>
            <Link href="/faq">FAQ</Link>
          </Text>
          <Text display={{ base: "none", sm: "block" }}>
            Made with ❤️ in Lisbon © 2026 EarTuner
          </Text>
        </Stack>
      </Container>
    </Box>
  );
}
