"use client";

import Header from "@/components/shared/header";
import Input from "@/components/shared/input";
import UserList from "@/components/user-list";
import { useDebounce } from "@/hooks/useDebouce";
import { Search } from "lucide-react";
import { useState } from "react";

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery, 500);

  return (
    <div className="space-y-5 max-xl:px-4">
      <Header>Users</Header>

      <Input
        placeholder="Search name, username, or email..."
        iconLeft={<Search className="text-gray-400" />}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
        <UserList searchQuery={debouncedSearch} />
      </div>
    </div>
  );
};

export default Dashboard;
