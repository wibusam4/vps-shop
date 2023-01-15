import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "../../../server/db";
import { verify } from "argon2";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { env } from "../../../env/server.mjs";
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.money = user.money;
        token.status = user.status;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.money = token.money;
        session.user.status = token.status;
      }
      return session;
    },
  },

  session: {
    strategy: "jwt",
  },

  jwt: {
    secret: env.NEXTAUTH_SECRET,
    maxAge: 24 * 30 * 60,
  },

  pages: {
    signIn: "/auth/login",
  },

  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {},
      authorize: async (credentials: any, res) => {
        try {
          const user = await prisma.user.findFirst({
            where: {
              email: credentials.email,
            },
          });
          if (!user) return null;
          const isValidPassword = await verify(
            user.password,
            credentials.password
          );
          if (!isValidPassword) return null;
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            money: user.money,
            role: user.role,
            status: user.status,
          };
        } catch (err) {
          console.log("Authorize error:", err);
        }
      },
    }),
  ],
};

export default NextAuth(authOptions);
