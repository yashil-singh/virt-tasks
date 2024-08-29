import { CircleCheck } from "lucide-react";
import React from "react";

type FormSuccessProps = { message: string };

const FormSuccess = ({ message }: FormSuccessProps) => {
  return (
    <div className="bg-green-100 p-3 rounded-md flex items-center gap-2 text-sm text-green-500">
      <CircleCheck className="size-4 text-green-500" />
      <p>{message}</p>
    </div>
  );
};

export default FormSuccess;
