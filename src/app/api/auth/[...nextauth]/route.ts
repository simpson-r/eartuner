import db from "@/core/db";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { NextAuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    EmailProvider({
      server: {
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // SSL
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
      session.userId = user.id;
      return session;
    },
  },
  pages: {
    signIn: "/login",
    verifyRequest: "/login?verifyRequest=1",
  },
  secret: process.env.SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
