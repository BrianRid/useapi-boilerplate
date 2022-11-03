import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../../../lib/prismadb";

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        name: { label: "name", type: "text" },
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },
      authorize: async (credentials) => {
        if (credentials) {
          const user = await prisma.user.findFirst({
            where: { name: credentials.name },
          });

          if (user && user.password === credentials.password) {
            return user;
          }
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
  },
  session: { strategy: "jwt" },
});
