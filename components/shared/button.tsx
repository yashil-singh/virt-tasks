import React from "react";
import Loader from "./loader";

interface CustomButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isLoading?: boolean;
}

const Button: React.FC<CustomButtonProps> = ({
  children,
  isLoading,
  ...props
}) => {
  return (
    <button
      {...props}
      className="bg-sky-500 h-10 text-sm font-semibold rounded-md hover:bg-sky-500/80 transition-all duration-200 active:scale-[98%] text-white flex items-center justify-center gap-2 disabled:bg-sky-500/60 disabled:cursor-not-allowed disabled:pointer-events-none px-2"
    >
      {isLoading ? <Loader /> : children}
    </button>
  );
};

export default Button;
