import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import client from "@/libs/server/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(client),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    // token에서 user id를 받아옴
    jwt({ token, account, profile }: any) {
      if (account) {
        console.log("token", token);
        token.accessToken = account.access_token;
        token.id = profile.id;
      }
      return token;
    },
    // token으로 받아온 user id를 session으로 넣어줌
    session({ session, token }: any) {
      session.accessToken = token.accessToken;
      console.log("token2", token);
      session.id = token.sub;
      return session;
    },
    // 로그인이 되면 '/'으로 redirect
    redirect({baseUrl}) {
      return baseUrl;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  // middleware를 사용하기 위한 설정
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/enter",
  },
};

export default NextAuth(authOptions);
