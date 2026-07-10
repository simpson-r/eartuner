import { Metadata } from 'next';

import { getSession } from '@/auth/sessions';
import { Layout } from '@/components/layout/Layout';
import { NotFoundPage } from '@/views/NotFoundPage';

export const metadata: Metadata = {
  title: '404 - Page Not Found',
  description: 'The page you are looking for does not exist.',
};

const NotFound = async () => {
  const session = await getSession();
  return (
    <Layout session={session}>
      <NotFoundPage />
    </Layout>
  );
};
export default NotFound;
