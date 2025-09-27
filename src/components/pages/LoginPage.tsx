"use client";

import { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { MdCheckCircleOutline } from "react-icons/md";

import {
  Box,
  Button,
  Container,
  Field,
  Flex,
  Icon,
  Input,
  Link,
  Stack,
} from "@chakra-ui/react";

import { getEmailProvider } from "@/lib/emails";
import { useLogin } from "@/hooks/use-login";
import { PageHeader } from "../layout/LayoutUtils";

const loggedOutCta = {
  header: "Sign in to EarTrainer+",
  description: "Use your email address to sign in",
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
  const [email, setEmail] = useState("");
  const { isPending, isSuccess, login } = useLogin(email);

  const handleSubmit = async (e: React.FormEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (email) login();
  };

  if (isSuccess) {
    const { name, url } = getEmailProvider(email);
    const header = (
      <Flex align="center" gap={2}>
        Check your email <Icon as={MdCheckCircleOutline} color="green.solid" />
      </Flex>
    );
    const description = (
      <Container direction="column" centerContent>
        <Box>
          A <b>sign-in link</b> has been sent to your email address.
        </Box>
        {name && url && (
          <Box>
            Check{" "}
            <Link href={url} variant="underline" fontWeight="bold">
              your {name} inbox
            </Link>
            .
          </Box>
        )}
      </Container>
    );

    return (
      <PageHeader header={header} description={description} align="center" />
    );
  }

  return (
    <Stack w="full" gap={4}>
      <PageHeader
        header={loggedOutCta.header}
        description={loggedOutCta.description}
        align="center"
      />
      <Box p={8} w="full" border="1px solid" borderColor="border" rounded="md">
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

          <Button
            size="sm"
            type="submit"
            loading={isPending}
            bgColor={email ? "green.solid" : "gray.solid"}
            disabled={!email}
          >
            <Flex gap={10}>
              Send magic link <FaPaperPlane />
            </Flex>
          </Button>
        </Stack>
      </Box>
    </Stack>
  );
};
