import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';

import { tailwindConfig } from './style';

export const MagicLinkEmail = ({ url }: { url: string }) => (
  <Tailwind config={tailwindConfig}>
    <Html>
      <Head />
      <Body className="bg-bg-2 m-0 px-6 max-h-fit font-sans text-center">
        <Preview>Sign in with this magic link</Preview>
        <Container className="bg-bg mx-auto my-20 py-12 px-6 w-full max-w-[600px] min-w-[300px] rounded-2xl">
          <Section>
            <Heading className="text-fg text-3xl font-sans">
              Sign in to EarTuner
            </Heading>
            <Text className="font-sans text-fg-2">
              Click below to securely sign in.
            </Text>
          </Section>
          <Section className="mb-8">
            <Button
              href={url}
              className="inline-block bg-brand max-w-[300px] w-full py-4 my-2 rounded-xl 
                        font-semibold font-sans text-white text-center text-sm
                        cursor-pointer select-none
                        active:translate-y-2  active:[box-shadow:0_0px_0_0_#1b6ff8,0_0px_0_0_#1b70f841]
                        active:border-b-[0px]
                        transition-all duration-150 [box-shadow:0_10px_0_0_#1b6ff8,0_15px_0_0_#1b70f841]
                        border-b-[1px] border-blue-400"
            >
              Sign in
            </Button>
          </Section>

          <Text className="mx-auto mt-2 mb-8 font-sans text-fg-3 text-center text-xs">
            If you didn't request this email, you can safely ignore it.
          </Text>
        </Container>
      </Body>
    </Html>
  </Tailwind>
);
