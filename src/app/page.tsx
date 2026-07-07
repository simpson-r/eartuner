import { HomePage } from '@/views/HomePage';

import { redirect } from 'next/navigation';

import { getCurrentUser } from '@/lib/sessions';
import { Layout } from '@/components/layout/Layout';

const Home = async () => {
  const user = await getCurrentUser();

  // If the user is logged in, boot them to the dashboard immediately
  if (user) {
    redirect('/dashboard');
  }

  // Construct a minimal session object for the Layout component since we are logged out
  const guestSession = null;

  return (
    <Layout session={guestSession}>
      <HomePage />
    </Layout>
  );
};

export default Home;
