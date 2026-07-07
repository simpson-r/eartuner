import { Providers } from '@/lib/providers';
import { getSession } from '@/lib/sessions';
import { manrope } from '@/lib/theme';

const description = 'Create personalized training exercises';
type Props = {
  children: React.ReactNode;
};

export default async function RootLayout({ children }: Props) {
  const session = await getSession();

  return (
    <html lang="en" className={manrope.className} suppressHydrationWarning>
      <meta name="description" content={description} />
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <body>
        <Providers session={session}>{children}</Providers>
      </body>
    </html>
  );
}
