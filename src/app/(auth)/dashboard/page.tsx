import { Metadata } from 'next';

import { getCurrentSessionRedirect } from '@/auth/sessions';
import { DashboardPage } from '@/views/DashboardPage';
import { notFound } from 'next/navigation';

export const metadata: Metadata = { title: 'Dashboard' };

const Dashboard = async () => {
  const session = await getCurrentSessionRedirect();

  if (!session?.user?.id) notFound();

  return <DashboardPage  />;
};

export default Dashboard;
