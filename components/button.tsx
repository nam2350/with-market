import { cls } from "@/libs/client/utils";

interface ButtonProps {
  size?: "sm" | "md" | "lg";
  text?: string;
  isFull?: boolean
  onClick?: () => void;
}

const Button = ({ size = "sm", text, onClick, isFull }: ButtonProps) => {
  let btnSize = "";
  if (size === "sm") {
    btnSize = "py-2 text-sm";
  } else if (size === "md") {
    btnSize = "py-3 text-base";
  } else if (size === "lg") {
    btnSize = "py-4 text-lg";
  }

  const btnColor = isFull ? 'bg-red-500 hover:bg-red-600 focus:ring-2 focus:ring-offset-2 focus:ring-red-400 focus:border-red-400' : 'bg-primaryB-400 hover:bg-primaryB-500 focus:ring-2 focus:ring-offset-2 focus:ring-primaryB-400 focus:border-primaryB-400';


  return (
    <button
      className={cls(
        `${btnSize} ${btnColor} mt-5 w-full text-white px-4 border border-transparent rounded-md shadow-sm font-medium `
      )}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
