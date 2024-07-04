"use client";
import { useRouter } from "next/navigation";
import React from "react";

const Backbutton = (): React.ReactElement => {
  const router = useRouter();
  return (
    <button
      className="bg-red-600 text-white px-2 py-1 text-sm box-border rounded absolute left-60 top-1/2 transform -translate-y-1/2"
      onClick={() => router.back()}
    >
      뒤로가기
    </button>
  );
};

export default Backbutton;
