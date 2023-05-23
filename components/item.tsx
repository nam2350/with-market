import Link from "next/link";

interface ItemProps {
  name: string;
  place: string;
  price: number;
  people: number;
  id: number;
  join?: number;
  isFull?:boolean;
  likes?: number;
}

export default function Item({
  name,
  place,
  price,
  people,
  id,
  join,
  likes,
  isFull
  
}: ItemProps) {
  return (
    <Link
      href={`/products/${id}`}
      className="flex px-4 pt-5 cursor-pointer justify-between"
    >
      <div className="flex space-x-4">
        <div className="w-20 h-20 bg-gray-400 rounded-md" />
        <div className="pt-2 flex flex-col">
          <h3 className="text-sm font-medium text-gray-900">{name}</h3>
          <span className="text-xs text-gray-500">{place}</span>
          <span className="font-medium mt-1 text-gray-900">{price}</span>
        </div>
      </div>
      <div className="flex space-x-2 items-end justify-end">
        {isFull ? (<div className="px-2  bg-gray-400">
          <span className="text-xs text-white ">참여 완료</span>
        </div>) : null}
        <div className="flex space-x-0.5 items-center text-sm text-gray-600">
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
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            ></path>
          </svg>
          <span>{likes}</span>
        </div>
        <div className="flex space-x-0.5 items-center text-sm text-gray-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
            />
          </svg>
          <span>{`${join}/${people}명`}</span>
        </div>
      </div>
    </Link>
  );
}
