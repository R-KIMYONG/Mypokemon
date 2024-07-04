"use client";
import { LoadingAlert } from "@/types/pokemon.type";
import React, { useEffect } from "react";
import Swal from "sweetalert2";

const Loading = () => {
  useEffect(() => {
    Swal.fire<LoadingAlert>({
      title: "로딩 중...",
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    return () => {
      Swal.close();
    };
  }, []);
  return <div></div>;
};

export default Loading;
