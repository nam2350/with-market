import { NextPage } from "next";
import Layout from "@/components/layout";

const Search: NextPage = () => {
  return (
    <Layout title="검색" hasTabBar>
      <div className="px-4">
        <div className="flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
          <input
            id="search"
            className="max-w-sm appearance-none pl-7 w-full px-3 py-2 border-b-2 placeholder-gray-400 focus:outline-none focus:border-primaryB-400 my-8"
            type="text"
            placeholder="검색어를 입력해주세요"
          />
        </div>
        <h3 className="text-sm font-medium text-gray-900 mb-5">추천 검색어</h3>
        <div className="flex">
          {[1, 1, 1, 1].map((_, i) => (
            <div key={i} className="flex cursor-pointer justify-between">
              <div className="flex mr-2">
                <div className="px-3 rounded-full border border-2 border-gray-200">
                  <span className="text-s text-gray-500">캔맥주</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Search;