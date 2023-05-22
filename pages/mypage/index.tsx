import type { NextPage } from "next";
import Layout from "@/components/layout";
import { useSession } from "next-auth/react";
import NotLogin from "@/components/not-login";
import NextImage from "next/image";
import withAuth from "@/components/withAuth";
import { useState } from "react";
import { User, Product, Member } from "@prisma/client";
import useSWR from "swr";
import Item from "@/components/item";

type Status = "WITH ME" | "WITH YOU" | "관심목록";

interface userWithMember extends User {
  member: Member;
}
interface userWithProduct extends User {
  products: Product;
}
interface getUserInfo {
  message?: string;
  user: User;
  products: userWithProduct[];
  member: userWithMember[];
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const MyWith: NextPage = () => {
  const { data: session, status } = useSession();
  const [activeButton, setActiveButton] = useState<Status>("WITH ME");

  const { data, error } = useSWR<getUserInfo>("/api/user/getUser", fetcher);

  if (error) return <div>Error loading products...</div>;
  if (!data) return <div>Loading...</div>;

  console.log(data);

  const handleClick = (currentStatus: Status) => {
    setActiveButton(currentStatus);
  };

  return (
    <Layout hasTabBar title="나의 WITH">
      <div className="px-4 ">
        <div className="flex items-center mt-4 space-x-3 ">
          <NextImage
            className="rounded-full"
            src={
              session?.user?.image ||
              "https://img1.daumcdn.net/thumb/R1280x0/?fname=http://t1.daumcdn.net/brunch/service/user/7r5X/image/9djEiPBPMLu_IvCYyvRPwmZkM1g.jpg"
            }
            alt="logo"
            width={50}
            height={50}
          />
          <div className="flex flex-col">
            <span className="font-medium text-gray-900">{`${session?.user?.name} 님 반가워요 😁`}</span>
          </div>
        </div>
        <div className="mt-10 flex justify-around">
          <div
            className="flex flex-col items-center cursor-pointer"
            onClick={() => handleClick("WITH ME")}
          >
            <div
              className={`w-14 h-14 text-white ${
                activeButton === "WITH ME" ? "bg-primaryB-400" : "bg-gray-400"
              } rounded-full flex items-center justify-center`}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                ></path>
              </svg>
            </div>
            <span
              className={`text-sm mt-2 font-medium ${
                activeButton === "WITH ME"
                  ? "text-primaryB-400"
                  : "text-gray-400"
              }`}
            >
              WITH ME
            </span>
          </div>
          <div
            className="flex flex-col items-center cursor-pointer"
            onClick={() => handleClick("WITH YOU")}
          >
            <div
              className={`w-14 h-14 text-white ${
                activeButton === "WITH YOU" ? "bg-primaryB-400" : "bg-gray-400"
              } rounded-full flex items-center justify-center`}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                ></path>
              </svg>
            </div>
            <span
              className={`text-sm mt-2 font-medium ${
                activeButton === "WITH YOU"
                  ? "text-primaryB-400"
                  : "text-gray-400"
              }`}
            >
              WITH YOU
            </span>
          </div>
          <div
            className="flex flex-col items-center cursor-pointer"
            onClick={() => handleClick("관심목록")}
          >
            <div
              className={`w-14 h-14 text-white ${
                activeButton === "관심목록" ? "bg-primaryB-400" : "bg-gray-400"
              } rounded-full flex items-center justify-center`}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                ></path>
              </svg>
            </div>
            <span
              className={`text-sm mt-2 font-medium ${
                activeButton === "관심목록"
                  ? "text-primaryB-400"
                  : "text-gray-400"
              }`}
            >
              관심목록
            </span>
          </div>
        </div>
      </div>
      {activeButton === "WITH ME" && (
        <div className="px-4 mt-6">
          {data.user?.products.map((product) => (
            <Item
              key={product.id}
              name={product.name}
              place={product.place}
              price={product.price}
              people={product.people}
              id={product.id}
              join={product.joinMember}
              isFull={product.isFull}
            />
          ))}
        </div>
      )}
      {activeButton === "WITH YOU" && (
        <div className="px-4 mt-6">내가 참여한 목록</div>
      )}
      {activeButton === "관심목록" && <div className="px-4 mt-6">관심목록</div>}
    </Layout>
  );
};

export default withAuth(MyWith);
