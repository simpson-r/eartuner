import NextAuth, { NextAuthConfig } from 'next-auth';
import Resend from 'next-auth/providers/resend';

import { PrismaAdapter } from '@auth/prisma-adapter';

import db from '@/db/client';

export const authConfig: NextAuthConfig = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: 'database',
  },
  providers: [
    Resend({
      apiKey: process.env.AUTH_RESEND_KEY,
      from: 'EarTuner <hello@eartuner.dev>',
      async sendVerificationRequest({ identifier: email, url, provider }) {
        const { Resend: ResendClient } = await import('resend');

        const resend = new ResendClient(provider.apiKey);

        await resend.emails.send({
          from: provider.from || '',
          to: email,
          subject: 'Sign in to EarTuner',
          html: `
           <body style="margin:0;background:#f7f7f7;">
            <table
              role="presentation"
              width="100%"
              cellspacing="0"
              cellpadding="0"
              style="padding:48px 24px;background:#f7f7f7;"
            >
              <tr>
                <td align="center">
                  <table
                    role="presentation"
                    width="100%"
                    cellspacing="0"
                    cellpadding="0"
                    style="
                      max-width:600px;
                      background:white;
                      border-radius:20px;
                      padding:56px 48px;
                      font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
                    "
                  >
                    <tr>
                      <td align="center">
                        <h1
                          style="
                            margin:32px 0 16px;
                            font-size:36px;
                            font-weight:700;
                            color:#111;
                          "
                        >
                          Sign in to EarTuner
                        </h1>

                        <p
                          style="
                            font-size:18px;
                            line-height:1.6;
                            color:#555;
                            margin-bottom:40px;
                          "
                        >
                          Click below to securely sign in.
                        </p>

                        <a
                          href="${url}"
                          style="
                            display:block;
                            background:#111;
                            color:white;
                            text-decoration:none;
                            padding:18px;
                            border-radius:14px;
                            font-size:18px;
                            font-weight:600;
                          "
                        >
                          Sign in
                        </a>

                        <p
                          style="
                            margin-top:40px;
                            color:#888;
                            font-size:14px;
                            line-height:1.5;
                          "
                        >
                          If you didn't request this email, you can safely ignore it.
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>`,
          text: `Sign in to EarTuner: ${url}`,
        });
      },
    }),
  ],
  pages: {
    signIn: '/login',
    verifyRequest: '/login?verifyRequest=1',
  },
  callbacks: {
    async session({ session, user }) {
      if (user?.id) {
        session.user.id = user.id;

        const dbUser = await db.user.findUnique({
          where: { id: user.id },
          select: { createdAt: true },
        });

        if (dbUser) {
          session.user.createdAt = dbUser.createdAt;
        }
      }

      return session;
    },
  },
  events: {
    async createUser({ user }) {
      if (user.id) {
        await db.userPreferences.create({
          data: { userId: user.id },
        });
      }
    },
  },
  secret: process.env.AUTH_SECRET,
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
