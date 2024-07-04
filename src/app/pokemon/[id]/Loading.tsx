"use client";
import React, { useEffect } from "react";
import Swal from "sweetalert2";

const Loading = () => {
  useEffect(() => {
    Swal.fire({
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
