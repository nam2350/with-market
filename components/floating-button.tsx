import Link from "next/link";
import React from "react";

interface FloatingButtonProps {
  children: React.ReactNode;
  href: string;
}

function FloatingButton({ children, href }: FloatingButtonProps) {
  return (
    <Link
      href={href}
      className="fixed hover:bg-primaryB-500 transition-colors cursor-pointer  bottom-24 right-5 shadow-xl bg-primaryB-400 rounded-full p-4 text-white"
    >
      {children}
    </Link>
  );
}

export default FloatingButton;
