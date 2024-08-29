"use client";

import React from "react";
import Header from "./header";
import Button from "./button";
import { logout } from "@/actions/auth";

const Navbar = () => {
  const onLogout = () => {
    logout();
  };
  return (
    <div className="bg-sky-100 shadow-sm sticky top-0 left-0 right-0 z-30 max-xl:px-4">
      <div className="max-w-screen-xl m-auto h-16 flex items-center justify-between">
        <Header>{"Welcome"}</Header>
        <Button onClick={onLogout}>Logout</Button>
      </div>
    </div>
  );
};

export default Navbar;
