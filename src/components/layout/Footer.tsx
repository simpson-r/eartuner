'use client';

import { Box, Container, Stack, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();
  return (
    <Box>
      <Container
        as={Stack}
        maxW="container.lg"
        gap={6}
        py={2}
        direction={{ base: 'column', md: 'row' }}
        alignItems={{ base: 'center', md: 'flex-end' }}
        justifyContent="center"
      >
        <Stack align="center" direction="row" gap={4} fontSize="xs">
          {pathname !== '/privacy' && (
            <Text>
              <Link href="/privacy">Privacy</Link>
            </Text>
          )}
          <Text display={{ base: 'none', sm: 'block' }}>© 2026 EarTuner</Text>
        </Stack>
      </Container>
    </Box>
  );
}
