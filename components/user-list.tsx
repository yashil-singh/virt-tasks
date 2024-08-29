"use client";

import { getUsers } from "@/actions/users";
import { User } from "@/types";
import React, { useEffect, useState } from "react";
import UserCard from "./user-card";
import Loader from "./shared/loader";
import Header from "./shared/header";
import FormError from "./shared/form-error";

const UserList = ({ searchQuery }: { searchQuery: string }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const fetchUsers = async () => {
    setIsLoading(true);

    const respone = await getUsers();

    if (respone?.users) {
      setUsers(respone.users);
      setFilteredUsers(respone.users);
      setFetchError(null);
    } else {
      if (respone?.error) {
        setFetchError(respone?.error);
      }
    }

    setIsLoading(false);
  };

  const filterUsers = () => {
    const query = searchQuery.toLowerCase();
    const filteredUsers = users.filter(
      (user) =>
        user.name.toLowerCase().includes(query) ||
        user.username.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query)
    );

    setFilteredUsers(filteredUsers);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    filterUsers();
  }, [searchQuery]);

  if (isLoading) {
    return (
      <div className="col-span-3 h-[350px] flex items-center justify-center">
        <Loader className="border-sky-500 m-auto" />
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="col-span-3 h-[350px] flex items-center justify-center">
        <FormError message={fetchError} />
      </div>
    );
  }

  if (filteredUsers.length === 0) {
    return (
      <div className="col-span-3 h-[350px] flex items-center justify-center">
        <Header className="text-xl">
          Oops! Looks like there are no users.
        </Header>
      </div>
    );
  }

  return (
    <>
      {filteredUsers.map((user) => (
        <UserCard user={user} key={user.id} />
      ))}
    </>
  );
};

export default UserList;
