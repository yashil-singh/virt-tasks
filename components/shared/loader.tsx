import React from "react";

const Loader = ({ className }: { className?: string }) => {
  return (
    <div
      className={`size-5 border-2 border-dashed border-white-500 rounded-full animate-loader-spin duration-5000 ${className}`}
    />
  );
};

export default Loader;
