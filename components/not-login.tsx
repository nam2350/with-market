import Button from "./button";
import { useRouter } from "next/router";

const NotLogin = () => {
  const router = useRouter();
  const goEnter = () => {
    router.push("/enter");
  };
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-1/2 text-center">
        <div>로그인을 해주세요!</div>
        <Button size="lg" text="로그인 하기" onClick={goEnter} />
      </div>
    </div>
  );
};

export default NotLogin;
