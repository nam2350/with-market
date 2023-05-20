import { ComponentType, ComponentProps, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

export default function withAuth<P extends object>(
  Component: ComponentType<P>
): ComponentType<P> {
  return function AuthComponent(props: ComponentProps<typeof Component>) {
    const router = useRouter();
    const { data: session, status } = useSession();

    useEffect(() => {
      if (status === "loading") return;
      if (!session) { 
        router.push("/enter"); 
      }
    }, [session, status, router]);

    if (status === "loading" || !session) {
      return <div>Loading...</div>; 
    }

    return <Component {...props} />;
  };
}
