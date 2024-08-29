import Navbar from "@/components/shared/navbar";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="h-full w-full relative">
      <Navbar />
      <div className="max-w-screen-xl m-auto py-5">{children}</div>
    </main>
  );
};

export default layout;
