import type { Metadata } from "next";

import Layout from "@/components/layout/Layout";
import { Providers } from "@/lib/providers";
import { getSession } from "@/lib/sessions";
import { manrope } from "@/lib/theme";

const description = "Create personalized training exercises";
const metadata: Metadata = { title: "Ear Trainer", description };

/**
 * This component renders the layout for the root layout for the webapp
 */
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();

  return (
    <html lang="en" className={manrope.className} suppressHydrationWarning>
      <meta name="description" content={description} />
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <body>
        <Providers session={session}>
          <Layout session={session}>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
}
