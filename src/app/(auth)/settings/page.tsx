import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getCurrentSessionRedirect, getCurrentUser } from '@/auth/sessions';
import { SettingsPage } from '@/views/SettingsPage';

export const metadata: Metadata = { title: 'Settings' };

const Settings = async () => {
  const session = await getCurrentSessionRedirect();
  const user = await getCurrentUser();

  if (!session?.user?.id) notFound();

  return <SettingsPage user={user} />;
};

export default Settings;
