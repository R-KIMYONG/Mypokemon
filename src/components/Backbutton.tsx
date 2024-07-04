"use client";
import { useRouter } from "next/navigation";
import React from "react";

interface BackbuttonProps {
  style: string;
}

const Backbutton = ({ style }: BackbuttonProps): React.ReactElement => {
  const router = useRouter();
  return (
    <button
      className={`${style}`}
      onClick={() => router.back()}
    >
      뒤로가기
    </button>
  );
};

export default Backbutton;
