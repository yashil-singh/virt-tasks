import { TriangleAlert } from "lucide-react";
import React from "react";

type FormErrorProps = { message: string };

const FormError = ({ message }: FormErrorProps) => {
  return (
    <div className="bg-red-100 p-3 rounded-md flex items-center gap-2 text-sm text-red-500">
      <TriangleAlert className="size-4 text-red-500" />
      <p>{message}</p>
    </div>
  );
};

export default FormError;
