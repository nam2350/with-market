import NextAuth, {  NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google"
import client  from '@/libs/server/client'
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { Session } from "next-auth/";


interface UserSession extends Session {
  id: string;
}
export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  adapter: PrismaAdapter(client),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    session: async ({ session, user }) => {
      (session as UserSession).id = user.id;
      return Promise.resolve(session as UserSession);
    },
  },
};

export default NextAuth(authOptions);
