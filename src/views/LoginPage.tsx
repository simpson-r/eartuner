'use client';

import { useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import { MdCheckCircleOutline } from 'react-icons/md';

import {
  Box,
  Container,
  Field,
  Flex,
  Icon,
  Input,
  Link,
  Stack,
  VStack,
} from '@chakra-ui/react';

import { getEmailProvider } from '@/auth/emails';
import { useLogin } from '@/hooks/use-login';
import { Layout } from '@/components/Layout';
import { ElevatedButton } from '@/components/ElevatedButton';

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
  const { isPending, isSuccess, login } = useLogin(email);

  const handleSubmit = async (e: React.FormEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (email) login();
  };

  if (isSuccess) {
    const { name, url } = getEmailProvider(email);
    const header = (
      <Flex align="center" gap={2}>
        Check your email <Icon as={MdCheckCircleOutline} color="fg.success" />
      </Flex>
    );
    const description = (
      <Box h="full">
        {name && url && (
          <Box>
            A sign-in link has been sent to{' '}
            <Link href={url} variant="underline" fontWeight="bold">
              your {name} inbox
            </Link>
            .
          </Box>
        )}
      </Box>
    );

    return (
      <Flex h="1/3">
        <Layout.TitleBlock
          header={header}
          description={description}
          align="center"
        />
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
