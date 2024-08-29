import Button from "@/components/shared/button";
import Header from "@/components/shared/header";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full h-full bg-sky-200 flex flex-col gap-6 items-center justify-center ">
      <span className="animate-move-down space-y-4">
        <div className="flex items-center ">
          <p className="text-4xl animate-pulse">👋</p>
          <Header className="text-4xl">Hello There!</Header>
        </div>
        <div className="flex flex-col gap-2 items-center">
          <Link href="/dashboard">
            <Button>View Users</Button>
          </Link>
          <p className="text-sm cursor-default text-gray-600">
            Powered by {"{JSON}"} placeholder
          </p>
        </div>
      </span>
    </div>
  );
}
