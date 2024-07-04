import React from "react";
import Backbutton from "@/components/Backbutton";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center gap-20 h-screen bg-gray-800 text-white absolute w-full h-screen top-0">
      <div>
        <Image
          src="/images/not-found.png"
          width={100}
          height={100}
          alt="not found image"
          className="w-full h-full"
        />
      </div>
      <div className="flex flex-col items-start justify-center">
        <h1 className="text-4xl mb-4">404 - Page Not Found</h1>
        <p className="mb-4">The page you are looking for does not exist.</p>
        <Backbutton
          style={"px-4 py-2 bg-green-400 text-white rounded-lg mt-4"}
        />
      </div>
    </div>
  );
}
