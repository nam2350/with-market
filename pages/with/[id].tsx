import type { NextPage } from "next";
import Layout from "@/components/layout";

const WithDetail: NextPage = () => {
  return (
    <Layout canGoBack>
      <div>
        <div className="flex px-4 cursor-pointer px-4 py-4  items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-slate-300" />
          <p className="text-sm font-medium text-gray-700">올린이</p>
        </div>
        <div className="mt-2 px-4 text-gray-700 border-b pb-8">
          <span className="text-orange-500 font-medium mr-2">📢</span>
          우리동네 조용한 카페 알려주세요!
        </div>
        <div>
          <div className="flex px-4 space-x-5 text-gray-700 py-3 border-b-[2px]  w-full">
            <span className="flex space-x-2 items-center text-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
                />
              </svg>
              <span>공감하기 1</span>
            </span>
            <span className="flex space-x-2 items-center text-sm">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                ></path>
              </svg>
              <span>답변 1</span>
            </span>
          </div>
        </div>
        <div className="px-4 my-5 space-y-5">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-slate-200 rounded-full" />
            <div>
              <div className="flex items-center">
                <span className="text-sm block font-medium text-gray-700 mr-1">
                  답변이
                </span>
                <span className="text-xs text-gray-500 block ">2시간 전</span>
              </div>
              <p className="text-gray-700 mt-2">
                오거리에 있는 수타벅스 좋아요!
              </p>
            </div>
          </div>
        </div>
        <form className="fixed py-2 bg-white bottom-2 inset-x-0 focus:border-primaryB-400">
          <div className="flex relative max-w-md items-center  w-full mx-auto">
            <input
              type="text"
              className="shadow-sm py-2 px-4 rounded-full w-full border-gray-300 focus:outline-none focus:outline-primaryB-400"
              placeholder="이웃과 정보를 나눠보세요 :)"
            />
            <div className="absolute flex py-2 pr-2 right-0">
              <button className="flex focus:ring-2 focus:ring-offset-2 focus:ring-primaryB-400 items-center bg-primaryB-400 rounded-full px-4 py-1 hover:bg-primaryB-500 text-md text-white">
                &rarr;
              </button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default WithDetail;
