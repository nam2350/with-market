import type { NextPage } from "next";
import Layout from "@/components/layout";
import { useSession } from "next-auth/react";
import NotLogin from "@/components/not-login";
import NextImage from "next/image";
import withAuth from "@/components/withAuth";
import { useState } from "react";
import useSWR from "swr";
import Item from "@/components/item";

type State = "withme" | "withyou" | "favs";


const fetcher = (url: string) => fetch(url).then((res) => res.json());

const MyWith: NextPage = () => {
  const { data: session } = useSession();
  const [state, setState] = useState<State>("withme");

  const { data, error } = useSWR(`/api/mypage/${state}`, fetcher);

  if (error) return <div>Error loading mypage...</div>;
  if (!data) return <div>Loading...</div>;

  console.log(`${state} data`, data);

  const handleClick = (currentStatus: State) => {
    setState(currentStatus);
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
            onClick={() => handleClick("withme")}
          >
            <div
              className={`w-14 h-14 text-white ${
                state === "withme" ? "bg-primaryB-400" : "bg-gray-400"
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
                state === "withme" ? "text-primaryB-400" : "text-gray-400"
              }`}
            >
              WITH ME
            </span>
          </div>
          <div
            className="flex flex-col items-center cursor-pointer"
            onClick={() => handleClick("withyou")}
          >
            <div
              className={`w-14 h-14 text-white ${
                state === "withyou" ? "bg-primaryB-400" : "bg-gray-400"
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
                state === "withyou" ? "text-primaryB-400" : "text-gray-400"
              }`}
            >
              WITH YOU
            </span>
          </div>
          <div
            className="flex flex-col items-center cursor-pointer"
            onClick={() => handleClick("favs")}
          >
            <div
              className={`w-14 h-14 text-white ${
                state === "favs" ? "bg-primaryB-400" : "bg-gray-400"
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
                state === "favs" ? "text-primaryB-400" : "text-gray-400"
              }`}
            >
              관심목록
            </span>
          </div>
        </div>
      </div>
      {state === "withme" && (
        <div className="px-4 mt-6">
          {data.products?.map((product) => (
            <Item
              key={product.id}
              name={product.name}
              place={product.place}
              price={product.price}
              people={product.people}
              id={product.id}
              join={product.joinMember}
              likes={product._count.favs}
              isFull={product.isFull}
            />
          ))}
        </div>
      )}
      {state === "withyou" && (
        <div className="px-4 mt-6">
          {data.members?.map((member) => (
            <Item
              key={member.id}
              name={member.name}
              place={member.place}
              price={member.price}
              people={member.people}
              id={member.id}
              join={member.joinMember}
              likes={member._count.favs}
              isFull={member.isFull}
            />
          ))}
        </div>
      )}
      {state === "favs" && (
        <div className="px-4 mt-6">
          {data.likes?.map((like) => (
            <Item
              key={like.id}
              name={like.name}
              place={like.place}
              price={like.price}
              people={like.people}
              id={like.id}
              join={like.joinMember}
              likes={like._count.favs}
              isFull={like.isFull}
            />
          ))}
        </div>
      )}
    </Layout>
  );
};

export default withAuth(MyWith);
