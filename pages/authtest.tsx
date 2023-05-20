import type { NextPage } from "next";
import useSWR from "swr";
import Layout from "@/components/layout";
import FloatingButton from "@/components/floating-button";
import Item from "@/components/item";
import withAuth from "@/components/withAuth"
import {Product, JoinProduct} from "@prisma/client"

interface joinProductWithProduct extends Product{
  joinProducts: JoinProduct[]
}

interface getAllProducts {
  message?: string;
  products: joinProductWithProduct[];
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
    <Layout title="HOME" hasTabBar>
      <div>auth HOC 테스트</div>
      <div className="flex flex-col space-y-5 divide-y">
        {data.products?.map((product) => (
          <Item
            key={product.id}
            name={product.name}
            place={product.place}
            price={product.price}
            people={product.people}
            id={product.id}
            join={product.joinProducts.length}
            isFullJoin={product.isFullJoin}
          />
        ))}
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
      </div>
    </Layout>
  );
};

export default withAuth(AuthTest);
