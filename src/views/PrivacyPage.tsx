import { Layout } from '@/components/layout/Layout';
import { Box, Heading, Link, List, Stack, Text } from '@chakra-ui/react';

const EFFECTIVE_DATE = 'July 10, 2026';
const CONTACT_EMAIL = 'support@eartuner.dev';

export const PrivacyPolicyPage = () => {
  return (
    <Layout.PageContainer>
      <Stack gap={{ base: 8, md: 10 }}>
        <Stack gap={3}>
          <Heading as="h1" fontSize={{ base: '3xl', md: '4xl' }}>
            Privacy Policy
          </Heading>

          <Text color="fg.muted">Effective date: {EFFECTIVE_DATE}</Text>
        </Stack>

        <Text color="fg.muted" lineHeight="1.8">
          EarTuner helps users practice ear-training exercises and track their
          progress. This Privacy Policy explains what information we collect,
          how we use it, and the choices available to you.
        </Text>

        <Section title="1. Information we collect">
          <Stack gap={4}>
            <Box>
              <Text fontWeight="semibold" color="fg">
                Account information
              </Text>
              <Text>
                When you create an account, we collect your email address so
                that we can authenticate you and associate your practice history
                with your account.
              </Text>
            </Box>

            <Box>
              <Text fontWeight="semibold" color="fg">
                Practice and usage information
              </Text>
              <Text>
                We collect information about the exercises you complete,
                including your answers, scores, accuracy, practice history, and
                statistics derived from that activity.
              </Text>
            </Box>

            <Box>
              <Text fontWeight="semibold" color="fg">
                Technical information
              </Text>
              <Text>
                Our hosting and infrastructure providers may automatically
                collect technical information such as your IP address, browser
                type, device information, and request logs.
              </Text>
            </Box>
          </Stack>
        </Section>

        <Section title="2. How we use your information">
          <List.Root gap={2} ps={5}>
            <List.Item>To create and manage your account.</List.Item>
            <List.Item>To save your practice history and progress.</List.Item>
            <List.Item>
              To calculate scores, accuracy, streaks, and other statistics.
            </List.Item>
            <List.Item>
              To operate, maintain, troubleshoot, and improve EarTuner.
            </List.Item>
            <List.Item>
              To protect the service against misuse, fraud, and security
              threats.
            </List.Item>
          </List.Root>
        </Section>

        <Section title="3. Authentication">
          <Text>
            EarTuner uses secure email magic links for authentication. We do not
            collect or store account passwords.
          </Text>
        </Section>

        <Section title="4. Cookies">
          <Text>
            We use cookies and similar browser storage where necessary to keep
            you signed in, maintain your session, and support essential service
            functionality.
          </Text>
        </Section>

        <Section title="5. Service providers">
          <Stack gap={3}>
            <Text>
              We may share information with service providers that help us
              operate EarTuner. These providers may process information only as
              needed to provide their services.
            </Text>

            <List.Root gap={2} ps={5}>
              <List.Item>Vercel, for application hosting.</List.Item>
              <List.Item>Resend, for authentication emails.</List.Item>
              <List.Item>
                Our database provider, for storing account and practice data.
              </List.Item>
            </List.Root>

            <Text>
              Update this section whenever you add analytics, error monitoring,
              payment processing, or other third-party services.
            </Text>
          </Stack>
        </Section>

        <Section title="6. Data retention">
          <Text>
            We retain your account information and practice data while your
            account remains active. We may retain limited information for longer
            where required for legal, security, or operational reasons.
          </Text>
        </Section>

        <Section title="7. Your privacy rights">
          <Stack gap={3}>
            <Text>Depending on where you live, you may have the right to:</Text>

            <List.Root gap={2} ps={5}>
              <List.Item>
                Request access to your personal information.
              </List.Item>
              <List.Item>Correct inaccurate information.</List.Item>
              <List.Item>Request deletion of your information.</List.Item>
              <List.Item>
                Request a copy of your information in a portable format.
              </List.Item>
              <List.Item>
                Object to or restrict certain uses of your information.
              </List.Item>
            </List.Root>

            <Text>
              To make a request, contact us at{' '}
              <Link href={`mailto:${CONTACT_EMAIL}`} colorPalette="blue">
                {CONTACT_EMAIL}
              </Link>
              .
            </Text>
          </Stack>
        </Section>

        <Section title="8. Account deletion">
          <Text>
            You may request deletion of your account and associated practice
            data by contacting us at{' '}
            <Link href={`mailto:${CONTACT_EMAIL}`} colorPalette="blue">
              {CONTACT_EMAIL}
            </Link>
            . We will process deletion requests within a reasonable period,
            unless we are required to retain certain information by law.
          </Text>
        </Section>

        <Section title="9. Data security">
          <Text>
            We use reasonable administrative and technical safeguards to protect
            your information. However, no method of transmission or storage is
            completely secure, and we cannot guarantee absolute security.
          </Text>
        </Section>

        <Section title="10. Children’s privacy">
          <Text>
            EarTuner can be used by learners of all ages. If you are under the
            age at which you can create an online account in your jurisdiction,
            you should use EarTuner with the permission or supervision of a
            parent or legal guardian. We do not knowingly collect personal
            information beyond what is necessary to provide the service.
          </Text>
        </Section>

        <Section title="11. Changes to this policy">
          <Text>
            We may update this Privacy Policy from time to time. When we make
            changes, we will update the effective date shown at the top of this
            page.
          </Text>
        </Section>

        <Section title="12. Contact">
          <Text>
            For privacy-related questions or requests, contact us at{' '}
            <Link href={`mailto:${CONTACT_EMAIL}`} colorPalette="blue">
              {CONTACT_EMAIL}
            </Link>
            .
          </Text>
        </Section>
      </Stack>
    </Layout.PageContainer>
  );
};

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <Stack gap={3}>
      <Heading as="h2" fontSize="xl">
        {title}
      </Heading>

      <Box color="fg.muted" lineHeight="1.8">
        {children}
      </Box>
    </Stack>
  );
};
