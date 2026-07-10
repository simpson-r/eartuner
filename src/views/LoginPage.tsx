'use client';

import { useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import { MdCheckCircleOutline } from 'react-icons/md';

import {
  Box,
  Container,
  Field,
  Flex,
  Heading,
  HStack,
  Icon,
  Input,
  Link,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';

import { getEmailProvider } from '@/auth/emails';
import { Layout } from '@/components/layout/Layout';
import { ElevatedButton } from '@/components/ElevatedButton';
import { useLogin } from '@/hooks/use-login';

const loggedOutCta = {
  header: 'Sign in to EarTuner',
  description: 'Use your email address to sign in',
};

/**
 * This component renders a login page that displays an auth form.
 */
export const LoginPage = () => {
  return (
    <Container maxW="lg" justifyContent="center" centerContent>
      <AuthForm />
    </Container>
  );
};

const AuthForm = () => {
  const [email, setEmail] = useState('');
  const { isPending, isSuccess, sendMagicLink } = useLogin(email);

  const handleSubmit = async (e: React.FormEvent<HTMLDivElement>) => {
    e.preventDefault();
    (document.activeElement as HTMLElement | null)?.blur();
    if (email) sendMagicLink();
  };

  if (isSuccess) {
    const { name, url } = getEmailProvider(email);
    return (
      <Flex w="full" h="1/3" direction="column" align="center" gap={2}>
        <HStack align="center">
          <Heading fontSize={{ base: '2xl', md: '3xl' }} as="h1">
            Check your email
          </Heading>
          <Icon as={MdCheckCircleOutline} boxSize="30px" color="fg.success" />
        </HStack>

        <Flex textAlign="center" w="full">
          {name && url && (
            <Box w="full">
              <Text fontSize="sm">
                A sign-in link has been sent to{' '}
                <Link href={url} variant="underline" fontWeight="bold">
                  your {name} inbox.
                </Link>
              </Text>
            </Box>
          )}
        </Flex>
      </Flex>
    );
  }

  return (
    <VStack w="full" h="2/3" gap={8} align="center">
      <Layout.TitleBlock
        header={loggedOutCta.header}
        description={loggedOutCta.description}
        align="center"
      />
      <Box w="9/12" rounded="xl">
        <Stack as="form" onSubmit={handleSubmit} gap={4}>
          <Field.Root id="email">
            <Field.Label>Email address</Field.Label>
            <Input
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
              placeholder="alice@gmail.com"
              type="email"
              name="email"
              autoComplete="email"
              fontSize="16px"
              required
            />
          </Field.Root>

          <ElevatedButton
            size="sm"
            type="submit"
            loading={isPending}
            surfaceColor={email ? 'cobalt.500' : 'gray.fg'}
            shadowColor={email ? 'cobalt.600' : undefined}
            disabled={!email}
            py={5}
          >
            <Flex gap={3} align="center">
              Send magic link <FaPaperPlane />
            </Flex>
          </ElevatedButton>
        </Stack>
      </Box>
    </VStack>
  );
};
