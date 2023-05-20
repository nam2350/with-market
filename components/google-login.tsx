import { signIn, signOut, useSession } from "next-auth/react";
import { Session } from "next-auth";
import NextImage from "next/image";
import Button from "./button";
import Layout from "@/components/layout";

interface UserSession extends Session {
  id: string;
}
export default function Enter() {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  if (loading) {
    return <div>Loading...</div>;
  }
  console.log("세션", session);

  return (
    <Layout hasTabBar title="로그인">
      {session ? (
        <div className="w-1/2 text-center">
          <div>로그인 되었습니다!!</div>
          <div>환영합니다. {session.user?.name}</div>
          <div>Email : {session.user?.email}</div>
          <NextImage
            
            src={
              session.user?.image ||
              "https://img1.daumcdn.net/thumb/R1280x0/?fname=http://t1.daumcdn.net/brunch/service/user/7r5X/image/9djEiPBPMLu_IvCYyvRPwmZkM1g.jpg"
            }
            alt="logo"
            width={50}
            height={50}
          />
          <div>Session Id: {(session as UserSession).id}</div>
          <Button text="로그아웃" onClick={() => signOut()} />
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-screen">
          <div className="w-1/2 text-center">
            <h1>로그인을 해주세요!</h1>
            <Button
              size="lg"
              text="구글 로그인"
              onClick={() => signIn("google")}
            />
          </div>
        </div>
      )}
    </Layout>
  );
}
