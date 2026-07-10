import { Metadata } from 'next';

import { getSession } from '@/auth/sessions';
import { Providers } from '@/app/providers';

export const metadata: Metadata = {
  title: 'EarTuner',
  description:
    'Practice ear training with customizable interval, chord, and scale exercises.',
};

type Props = {
  children: React.ReactNode;
};

export default async function RootLayout({ children }: Props) {
  const session = await getSession();

  return (
    <html lang="en" suppressHydrationWarning>
      <meta name="description" content={metadata.description ?? ''} />
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <body>
        <Providers session={session}>{children}</Providers>
      </body>
    </html>
  );
}
