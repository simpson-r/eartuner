import { getSession } from '@/auth/sessions';
import { Layout } from '@/components/layout/Layout';
import { PrivacyPolicyPage } from '@/views/PrivacyPage';

const PrivacyPage = async () => {
  const session = await getSession();
  return (
    <Layout session={session}>
      <PrivacyPolicyPage />;
    </Layout>
  );
};

export default PrivacyPage;
