import NextAuth, { NextAuthConfig } from 'next-auth';
import Resend from 'next-auth/providers/resend';

import { PrismaAdapter } from '@auth/prisma-adapter';

import db from '@/db/client';
import {MagicLinkEmail} from '@/emails/email';


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
          react: <MagicLinkEmail url={url} />,
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
