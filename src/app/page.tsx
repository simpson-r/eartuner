import { LandingPage } from '@/views/LandingPage';

import { redirect } from 'next/navigation';

import { getCurrentUser } from '@/auth/sessions';
import { Layout } from '@/components/Layout';

const Home = async () => {
  const user = await getCurrentUser();

  if (user) redirect('/dashboard');

  const guestSession = null;

  return (
    <Layout session={guestSession}>
      <LandingPage />
    </Layout>
  );
};

export default Home;
