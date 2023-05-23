import type { NextPage } from "next";
import Layout from "@/components/layout";
import { useRouter } from "next/router";
import Link from "next/link";
import useSWR, { mutate } from "swr";
import Image from "next/image";
import Button from "@/components/button";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Session } from "next-auth";
import { Product, Member, User } from "@prisma/client";
import { cls } from "@/libs/client/utils";

interface UserSession extends Session {
  id?: string;
}

interface memberwithUser extends Member {
  user: User;
}

interface productWithMember extends Product {
  user: User;
  members: memberwithUser[];
}

interface getProductData {
  message?: string;
  product: productWithMember;
  isFull: boolean;
  joinMember: number;
  relatedProducts: Product[];
  isLiked: boolean;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const ItemDetail: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: session, status } = useSession();

  const { data, error } = useSWR<getProductData>(
    id ? `/api/products/${id}` : null,
    fetcher
  );

  if (error) return <div>Error loading product...</div>;
  if (!data) return <div>Loading...</div>;

  const onFavClick = () => {
    fetch(`/api/products/${id}/fav`, {
      method: "POST",
      body: JSON.stringify({ productId: id }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => console.log("좋아요", data));
    mutate(`/api/products/${id}`, { ...data, isLiked: !data.isLiked }, false);
  };

  const join = async (productId: string) => {
    if (!session) {
      alert("로그인을 해주세요!");
      router.push("/enter");
    } else if ((session as UserSession).id === data.product.userId) {
      alert("이미 참여 하셨습니다");
      return;
    } else if (data.isFull) {
      alert("참여가 완료 되었습니다.");
      return;
    }

    await fetch("/api/products/{$id}/join", {
      method: "POST",
      body: JSON.stringify({ productId }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => console.log("join data", data))
      .finally(() => {
        router.reload();
      });
  };

  // console.log("참여중인 사람", data.product.members);
  console.log("개별 상품 데이터", data);

  return (
    <Layout canGoBack>
      {!data ? (
        <span>로딩중...</span>
      ) : (
        <div className="px-4 py-10">
          <div className="mb-8">
            <div className="h-96 bg-slate-300" />
            <div className="flex justify-between py-3 border-t border-b items-center space-x-3">
              <div className="flex items-center">
                <Image
                  src={data?.product?.user.image || ""}
                  className="w-12 h-12 rounded-full bg-slate-300 mr-2"
                  alt="profile image"
                  width={50}
                  height={50}
                />
                <p className="text-sm font-medium text-gray-700">
                  {data?.product?.user.name}
                </p>
              </div>
              <div className="flex items-center">
                <div className="p-3 flex items-center space-x-1.5">
                  <span className="text-gray-600 text-lg">WITH</span>
                  <span className="text-primaryB-400 text-lg">
                    {`${data?.joinMember} / ${data?.product?.people}`}
                  </span>
                </div>
                <button
                  onClick={onFavClick}
                  className={cls(
                    "p-3 rounded-md flex items-center justify-center hover:bg-gray-100 cursor-pointer",
                    data?.isLiked
                      ? "text-red-400 hover:text-red-500"
                      : "text-gray-400 hover:text-gray-500"
                  )}
                >
                  {data?.isLiked ? (
                    <svg
                      className="h-6 w-6 "
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="h-6 w-6 "
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
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            <div className="mt-5">
              <h1 className="text-3xl font-bold text-gray-900">
                {data?.product?.name}
              </h1>
              <span className="text-md block mt-3 text-gray-900">
                {data?.product?.place}
              </span>
              <span className="text-2xl block mt-3 text-gray-900">
                {data?.product?.price}원
              </span>
              <p className=" my-6 text-gray-700">
                {data?.product?.description}
              </p>
            </div>
            <Button
              size="md"
              text={data.isFull ? "참여 완료" : "참여 하기"}
              onClick={() => join(String(id))}
            />
            <div>
              <p className=" my-6 text-gray-700">참여 중인 사람</p>
              <div className="flex items-center mt-5">
                <Image
                  src={data.product?.user.image || ""}
                  className="w-12 h-12 rounded-full bg-slate-300 mr-2"
                  alt="profile image"
                  width={50}
                  height={50}
                />
                <p className="text-sm font-medium text-gray-700">
                  {data.product?.user.name}
                </p>
              </div>
              {data?.product?.members?.map((member) => (
                <div key={member.id} className="flex items-center mt-5">
                  <Image
                    src={member.user.image || ""}
                    className="w-12 h-12 rounded-full bg-slate-300 mr-2"
                    alt="profile image"
                    width={50}
                    height={50}
                  />
                  <p className="text-sm font-medium text-gray-700">
                    {member.user.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
          {data?.relatedProducts?.length ? (
            <div>
              <h2 className="text-2xl font-bold text-gray-900">비슷한 상품</h2>
              <div className=" mt-6 grid grid-cols-2 gap-4">
                {data?.relatedProducts?.map((product) => (
                  <Link href={`/products/${product.id}`} key={product.id}>
                    <div className="h-56 w-full mb-4 bg-slate-300" />
                    <h3 className="text-gray-700 -mb-1">{product.name}</h3>
                    <span className="text-sm font-medium text-gray-900">
                      {product.price}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      )}
    </Layout>
  );
};

export default ItemDetail;
