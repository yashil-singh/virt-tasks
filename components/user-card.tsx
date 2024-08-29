"use client";

import React, { useEffect, useState } from "react";
import Card from "./shared/card";
import { User as UserType } from "@/types";
import {
  Building,
  Contact,
  Globe,
  Info,
  Mail,
  Phone,
  User,
} from "lucide-react";
import Modal from "./shared/modal";

type Props = {
  user: UserType;
};

const UserCard = ({ user }: Props) => {
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const [currentModalPage, setCurrentModalPage] = useState<
    "personal" | "contact" | "company"
  >("personal");

  useEffect(() => {
    setCurrentModalPage("personal");
  }, [openDetailsModal]);
  return (
    <>
      <button
        onClick={() => setOpenDetailsModal(true)}
        className="active:scale-[99%]"
      >
        <Card title={user.name} className="max-w-full">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <User className="size-5" />
              <p className="text-gray-700 lowercase">@{user.username}</p>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="size-5" />
              <p className="lowercase">{user.email}</p>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="size-5" />
              <p className="lowercase">{user.phone}</p>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="size-5" />
              <p className="underline text-blue-500 cursor-pointer">
                {user.website}
              </p>
            </div>
            <button
              className=" text-blue-500 self-end mt-3 hover:underline"
              onClick={() => {
                setOpenDetailsModal(true);
              }}
            >
              View More...
            </button>
          </div>
        </Card>
      </button>

      <Modal
        title={"User Information"}
        open={openDetailsModal}
        setOpen={setOpenDetailsModal}
        width={450}
      >
        <hr className="my-3" />

        <div className="flex flex-col gap-4">
          {/* TABS */}
          <div className="grid grid-cols-3 gap-2 mt-2">
            <button
              className={`p-2 flex-1 rounded-md flex flex-col items-center justify-center active:scale-[98%] ${
                currentModalPage === "personal"
                  ? "bg-sky-100 text-sky-500 border border-sky-500"
                  : "border border-gray-300"
              }`}
              onClick={() => setCurrentModalPage("personal")}
            >
              <Info />
              <p className="text-xs">
                Personal <br /> Information
              </p>
            </button>

            <button
              className={`p-2 flex-1 rounded-md flex flex-col items-center justify-center active:scale-[98%] ${
                currentModalPage === "contact"
                  ? "bg-sky-100 text-sky-500 border border-sky-500"
                  : "border border-gray-300"
              }`}
              onClick={() => setCurrentModalPage("contact")}
            >
              <Contact />
              <p className="text-xs">
                Contact <br /> Information
              </p>
            </button>

            <button
              className={`p-2 flex-1 rounded-md flex flex-col items-center justify-center active:scale-[98%] ${
                currentModalPage === "company"
                  ? "bg-sky-100 text-sky-500 border border-sky-500"
                  : "border border-gray-300"
              }`}
              onClick={() => setCurrentModalPage("company")}
            >
              <Building />
              <p className="text-xs">
                Company <br /> Information
              </p>
            </button>
          </div>

          {/* CONTENT */}
          <>
            {currentModalPage === "personal" && (
              <>
                <div className="grid grid-cols-4">
                  <div className="col-span-1">
                    <p className="font-bold text-sm">Full Name:</p>
                    <p className="font-bold text-sm">Username:</p>
                    <p className="font-bold text-sm">Address:</p>
                  </div>
                  <div className="col-span-3">
                    <p className="capitalize text-sm">{user.name}</p>
                    <p className="lowercase text-sm">@{user.username}</p>
                    <p className="capitalize text-sm">
                      {user.address.city}, {user.address.street},{" "}
                      {user.address.suite} {user.address.zipcode}
                    </p>
                  </div>
                </div>
              </>
            )}

            {currentModalPage === "contact" && (
              <>
                <div className="grid grid-cols-4">
                  <div className="col-span-1">
                    <p className="font-bold text-sm">Email Address:</p>
                    <p className="font-bold text-sm">Phone:</p>
                    <p className="font-bold text-sm">Website:</p>
                  </div>
                  <div className="col-span-3">
                    <p className="lowercase text-sm">{user.email}</p>
                    <p className="lowercase text-sm">{user.phone}</p>
                    <p className="lowercase text-sm">{user.website}</p>
                  </div>
                </div>
              </>
            )}

            {currentModalPage === "company" && (
              <>
                <div className="grid grid-cols-4">
                  <div className="col-span-1">
                    <p className="font-bold text-sm">Name:</p>
                    <p className="font-bold text-sm">BS:</p>
                    <p className="font-bold text-sm">Catch Prase:</p>
                  </div>
                  <div className="col-span-3">
                    <p className="capitalize text-sm">{user.company.name}</p>
                    <p className="capitalize text-sm">{user.company.bs}</p>
                    <p className="capitalize text-sm">
                      {user.company.catchPhrase}
                    </p>
                  </div>
                </div>
              </>
            )}
          </>
        </div>
      </Modal>
    </>
  );
};

export default UserCard;
