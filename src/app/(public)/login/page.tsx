import { redirect } from 'next/navigation';

import { getCurrentUser } from '@/auth/sessions';
import { LoginPage } from '@/views/LoginPage';

const Login = async () => {
  const user = await getCurrentUser();
  if (user) redirect('/dashboard');

  return <LoginPage />;
};

export default Login;
