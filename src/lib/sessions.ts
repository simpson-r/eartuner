import { Session } from 'next-auth';
import { redirect } from 'next/navigation';

import { auth, authConfig } from '@/lib/auth';

export async function getSession() {
  return await auth();
}

export async function getCurrentUser() {
  const session = await getSession();
  return session?.user;
}

export async function getCurrentUserOrRedirect(): Promise<Session['user']> {
  const user = await getCurrentUser();

  if (!user) redirect(authConfig.pages!.signIn!);

  return user;
}

export async function getCurrentSessionRedirect(): Promise<Session> {
  const session = await getSession();

  if (!session?.user?.id) redirect(authConfig.pages!.signIn!);
  return session;
}
