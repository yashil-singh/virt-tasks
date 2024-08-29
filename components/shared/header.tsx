import { Poppins } from "next/font/google";
import React from "react";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

type HeaderProps = {
  children: React.ReactNode;
  className?: string;
};

const Header = ({ children, className }: HeaderProps) => {
  return (
    <h1 className={`text-2xl font-bold ${font.className} ${className}`}>
      {children}
    </h1>
  );
};

export default Header;
