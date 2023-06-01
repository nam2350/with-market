import type { NextPage } from "next";
import useSWR from "swr";
import Layout from "@/components/layout";
import FloatingButton from "@/components/floating-button";
import Item from "@/components/item";
// import withAuth from "@/components/withAuth"
import { Product, Member } from "@prisma/client";

interface membertWithProduct extends Product {
  members: Member[];
}

interface getAllProducts {
  message?: string;
  products: membertWithProduct[];
  isFull?: boolean;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const AuthTest: NextPage = () => {
  const { data, error } = useSWR<getAllProducts>(
    "/api/products/getAllProducts",
    fetcher
  );

  if (error) return <div>Error loading products...</div>;
  if (!data) return <div>Loading...</div>;

  console.log(data);

  return (
    <Layout title="TEST PAGE" hasTabBar>
      {/* <div>auth HOC 테스트</div> */}
      <div>auth 미들웨어 테스트</div>

      <FloatingButton href="/products/upload">
        <svg
          className="h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      </FloatingButton>
    </Layout>
  );
};

export default AuthTest;
