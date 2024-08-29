"use client";

import React, { useEffect } from "react";
import Header from "./header";
import { X } from "lucide-react";

type ModalProps = {
  title: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  children: React.ReactNode;
  width?: number;
};

const Modal = ({ title, open, setOpen, children, width = 500 }: ModalProps) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);
  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/40 z-40 flex items-center justify-center transition-all animate-fade-in overflow-hidden">
          <div
            className="bg-white rounded-md p-3 z-50 animate-move-down relative pt-10 w-full"
            style={{ maxWidth: `${width}px` }}
          >
            <button
              className="absolute right-3 top-3"
              onClick={() => setOpen(false)}
            >
              <X />
            </button>
            <Header className="text-lg">{title}</Header>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
