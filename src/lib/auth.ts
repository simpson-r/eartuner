import NextAuth, { NextAuthConfig } from 'next-auth';
import EmailProvider from 'next-auth/providers/email';

import { PrismaAdapter } from '@auth/prisma-adapter';

import db from '@/lib/db';

export const authConfig: NextAuthConfig = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: 'database',
  },
  providers: [
    EmailProvider({
      server: {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: process.env.EMAIL_FROM!,
          pass: process.env.EMAIL_APP_PASSWORD!,
        },
        connectionTimeout: 20_000,
        greetingTimeout: 20_000,
        socketTimeout: 20_000,
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
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
  pages: {
    signIn: '/login',
    verifyRequest: '/login?verifyRequest=1',
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
