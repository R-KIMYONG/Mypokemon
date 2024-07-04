"use client";
import Backbutton from "@/components/Backbutton";
import Image from "next/image";
import React from "react";

export function generateMetadata() {
  return {
    title: "Error Page",
    description: "오류 발생했습니다. 오류 메시지 확인해주세요.",
  };
}
export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  return (
    <>
      <html>
        <body>
          <div className="flex items-center justify-center h-screen bg-pink-800 text-white gap-20">
            <div className="w-2/12">
              <Image
                src="/images/error.png"
                alt="error-Image"
                width={50}
                height={50}
                className="w-full "
              />
            </div>
            <div>
              <h2 className="text-4xl mb-4">⚠️ ERROR!</h2>
              <p>{error.message}</p>
              <Backbutton
                style={"px-4 py-2 bg-green-400 text-white rounded-lg mt-4"}
              />
            </div>
          </div>
        </body>
      </html>
    </>
  );
}
