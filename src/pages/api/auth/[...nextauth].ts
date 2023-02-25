import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "../../../server/db";
import { verify } from "argon2";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { env } from "../../../env/server.mjs";

const updateUser = async (id: any) => {
  const user  = prisma.user.findUnique({
    where: { id },
  });
  return user;
};

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  callbacks: {
    jwt: async ({ token, user }) => {
      if(!user && token){
        const newUser = await updateUser(token.id)
        token.money = newUser?.money
      }
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
      authorize: async (credentials) => {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        try {
          const foundUser = await prisma.user.findFirst({
            where: {
              email: email,
            },
          });
          if (!foundUser) return null;
          const isValidPassword = await verify(foundUser.password, password);
          if (!isValidPassword) return null;
          return foundUser as any;
        } catch (err: any) {
          throw new Error("Authorize error:", err);
        }
      },
    }),
  ],
};

export default NextAuth(authOptions);
