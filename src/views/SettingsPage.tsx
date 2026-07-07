'use client';

import { User } from 'next-auth';
import { useRef, useState } from 'react';

import {
  Button,
  Field,
  HStack,
  Input,
  Stack,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { Instrument } from '@prisma/client';

import { Layout } from '@/components/Layout';
import { ConfirmationModal } from '@/components/ConfirmationModal';
import { toaster } from '@/components/ui/toaster';
import { useHistory } from '@/hooks/use-history';
import { useUser } from '@/hooks/use-user';
import {
  LeftAlignedSegment,
  LeftAlignedSwitch,
  Section,
} from '@/views/SettingsPage.style';

import { ClientPreferences } from '@/features/exercise/types';
import { usePreferencesContext } from '@/context/PreferencesContext';
import { signOut } from 'next-auth/react';

type AccountAction = 'reset' | 'delete';

const ACCOUNT_SETTINGS = [
  {
    label: 'Reset',
    description: 'Reset practice history',
    key: 'reset' as AccountAction,
  },
  {
    label: 'Delete',
    description: 'Delete your account permanently',
    key: 'delete' as AccountAction,
  },
];

const INSTRUMENT_ITEMS = ['Piano', 'Guitar'];

/**
 * This component renders the home dashboard page for the given user.
 */
export const SettingsPage = ({
  user,
}: {
  user?: User & { createdAt?: Date; id: string };
}) => {
  const [action, setAction] = useState<AccountAction>('reset');
  const { resetHistory, isResetting } = useHistory();
  const { deleteAccount, isDeletingAccount } = useUser();
  const { updatePreferences, preferences } = usePreferencesContext();
  const hasPatchedPref = useRef(false);

  const {
    open: isConfirmationModalOpen,
    onClose: onConfirmationModalClose,
    onOpen: onConfirmationModalOpen,
  } = useDisclosure();

  const created =
    user?.createdAt &&
    new Date(user?.createdAt).toLocaleDateString(undefined, {
      month: 'long',
      year: 'numeric',
    });

  const handlePrefChange = <K extends keyof ClientPreferences>(
    key: K,
    value: ClientPreferences[K],
  ) => {
    updatePreferences({ [key]: value });
    hasPatchedPref.current = true;
  };

  const handleAccountSettingClick = (key: AccountAction) => {
    setAction(key);
    onConfirmationModalOpen();
  };

  const handleAccountActionConfirm = async () => {
    switch (action) {
      case 'delete':
        await deleteAccount();
        await signOut({ callbackUrl: '/' });
        break;
      case 'reset':
        await resetHistory();

        toaster.create({
          description: 'Reset history successfully',
          type: 'info',
        });
        break;
    }
    onConfirmationModalClose();
  };

  return (
    <Layout.PageContainer>
      <Stack direction="column" maxW="1/2" w="full" gap={6}>
        {/* page title */}
        <Layout.TitleBlock
          header="Settings"
          justify="flex-start"
          w={{ base: 'full', md: '1/3' }}
        />
        {/* settings */}
        <VStack
          w="full"
          border="2px solid"
          borderRadius="3xl"
          borderColor="border"
          align="flex-end"
          gap={10}
          p={6}
        >
          {/* info */}
          <Section label="Personal info">
            <Text fontSize="sm" color="fg">
              {`Joined in ${created}`}
            </Text>
            <Field.Root readOnly>
              <Field.Label color="fg">Email address</Field.Label>
              <Input
                name="email"
                value={user?.email ?? ''}
                _active={{ borderColor: 'border', border: '1px solid' }}
              />
            </Field.Root>
          </Section>

          {/* preferences */}
          <Section label="Preferences">
            <LeftAlignedSegment
              label="Default instrument"
              value={preferences?.defaultInstrument || 'Piano'}
              items={INSTRUMENT_ITEMS}
              onValueChange={(e) =>
                handlePrefChange('defaultInstrument', e.value as Instrument)
              }
            />
            <LeftAlignedSwitch
              label="Enable sound effects in lessons"
              color="fg"
              checked={preferences?.lessonSoundEffects}
              onCheckedChange={(e) =>
                handlePrefChange('lessonSoundEffects', e.checked)
              }
            />
          </Section>
          {/* acc management */}
          <Section label="Account management">
            {ACCOUNT_SETTINGS.map(({ key, label, description }) => (
              <HStack key={key} w="full" justify="space-between" align="center">
                <Text fontSize="sm" color="fg" fontWeight="normal">
                  {description}
                </Text>

                <Button
                  size="md"
                  w="150px"
                  rounded="4xl"
                  variant="outline"
                  border="1.5px solid"
                  borderColor="border"
                  color={key === 'delete' ? 'red.solid' : 'fg'}
                  onClick={() => handleAccountSettingClick(key)}
                >
                  {label}
                </Button>
              </HStack>
            ))}
          </Section>
        </VStack>
      </Stack>
      <ConfirmationModal
        ctaConfig={{
          heading: `Are you sure you want to ${action} your account?`,
          body: 'This cannot be undone. Your data will be permanently deleted',
          cancelText: 'Cancel',
          confirmText: `Continue to ${action}`,
        }}
        isOpen={isConfirmationModalOpen}
        isLoading={isResetting || isDeletingAccount}
        onClose={onConfirmationModalClose}
        onConfirm={handleAccountActionConfirm}
      />
    </Layout.PageContainer>
  );
};
