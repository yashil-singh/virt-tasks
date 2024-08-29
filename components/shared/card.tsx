import React from "react";
import Header from "./header";

type CardProps = {
  title: string;
  children: React.ReactNode;
  className?: string;
};

const Card = ({ title, children, className }: CardProps) => {
  return (
    <div
      className={`bg-white rounded-md shadow-sm max-w-[450px] w-full space-y-3 ${className} border border-gray-100 overflow-hidden`}
    >
      {/* CARD HEADER */}
      <div className="flex justify-center md:justify-start text-center bg-sky-500 p-5">
        <Header className="text-lg xl:text-xl text-white">{title}</Header>
      </div>
      {/* CARD CONTENT */}
      <div className="px-5 pb-5">{children}</div>
    </div>
  );
};

export default Card;
