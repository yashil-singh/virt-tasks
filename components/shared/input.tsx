"use client";

import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  isError?: boolean;
  isPasswordEntry?: boolean;
  iconLeft?: React.ReactNode;
}

const Input: React.FC<CustomInputProps> = ({
  label,
  isError = false,
  iconLeft,
  isPasswordEntry = false,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div
      className={`flex items-center bg-white shadow-sm rounded-md border border-gray-100 gap-2 px-2 text-sm  ${
        isError
          ? "outline outline-red-500"
          : "focus-within:outline outline-sky-500"
      } transition-colors outline-2`}
    >
      {iconLeft && <span className="text-gray-700">{iconLeft}</span>}
      <input
        {...props}
        className="w-full focus:outline-none py-2.5"
        type={`${isPasswordEntry && !showPassword && "password"}`}
      />
      {isPasswordEntry && (
        <button
          type="button"
          className="transition-all rounded-full size-5 mr-1"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <Eye /> : <EyeOff />}
        </button>
      )}
    </div>
  );
};

export default Input;
