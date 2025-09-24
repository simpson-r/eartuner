"use client";

import { signIn } from "next-auth/react";

import { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { MdCheckCircleOutline } from "react-icons/md";

import {
  Box,
  Button,
  Field,
  Heading,
  Icon,
  Input,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";

import { getEmailProvider } from "@/lib/emails";

export const LoginPage = () => {
  const [email, setEmail] = useState("");

  const {
    mutate: login,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: () =>
      signIn("email", { email, redirect: false, callbackUrl: "/" }),
  });

  const renderAuthForm = () => {
    if (isSuccess) {
      const { name, url } = getEmailProvider(email);
      return (
        <Stack textAlign="center" align="center" h="1/3">
          <Heading alignItems="center">
            Check your email <Icon as={MdCheckCircleOutline} />
          </Heading>
          <Text maxW="30rem" fontSize="xl">
            A <b>sign in link</b> has been sent to your email address.
            <br />
            {name && url && (
              <>
                Check{" "}
                <Link textDecoration="underline" href={url}>
                  your {name} inbox
                </Link>
                .
              </>
            )}
          </Text>
        </Stack>
      );
    }

    return (
      <Stack h="2/3" gap={4}>
        <Stack textAlign="center" align="center">
          <Text fontWeight="bold" as="h2" fontSize="4xl">
            Sign in to EarTrainer+
          </Text>
          <Text fontSize="lg">Use your email address to sign in</Text>
        </Stack>
        <Box
          rounded="lg"
          bg="white"
          border="1px solid"
          borderColor="border"
          p={8}
          w="100%"
        >
          <Stack
            as="form"
            onSubmit={async (e) => {
              e.preventDefault();
              email && login();
            }}
            gap={4}
          >
            <Field.Root id="email">
              <Field.Label>Email address</Field.Label>
              <Input
                required
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
                placeholder="me@gmail.com"
                type="email"
              />
            </Field.Root>

            <Stack gap={10}>
              <Button loading={isPending} type="submit">
                Send magic link
                <FaPaperPlane />
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    );
  };

  return (
    <Stack
      textAlign="center"
      justify="center"
      maxW="md"
      margin="auto"
      h="calc(100vh - 64px)"
    >
      {renderAuthForm()}
    </Stack>
  );
};
