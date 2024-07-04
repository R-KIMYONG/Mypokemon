"use client";
import { ErrorAlert, LoadingAlert, Pokemons } from "@/types/pokemon.type";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useInView } from "react-intersection-observer";
import Swal from "sweetalert2";
import PokemonList from "./_components/PokemonList";

const ITEMS_PER_PAGE = 24;
export default function Home(): React.ReactElement {
  const {
    data: pokemons = [],
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
    error,
  } = useInfiniteQuery({
    queryKey: ["pokemons"],
    initialPageParam: 1,
    queryFn: async ({ pageParam = 1 }): Promise<Pokemons[]> => {
      try {
        const { data } = await axios.get<Pokemons[]>("/api/pokemons", {
          params: { _page: pageParam, _limit: ITEMS_PER_PAGE },
        });
        return data;
      } catch (error) {
        if (error instanceof AxiosError) {
          console.error(
            "전체 데이터 수신하는데에 있어서 오류 발생",
            error.message
          );
          throw new Error("Axios오류 발생함");
        } else {
          console.error(
            "전체 데이터 받아오는 과정중 예상치 못한 오류 발생",
            error
          );
          throw new Error("예상치못한 오류 발생");
        }
      }
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage?.length === ITEMS_PER_PAGE
        ? allPages.length + 1
        : undefined;
    },
    select: (data) => data.pages.flat(), // 데이터 누적 용도
    staleTime: 1000 * 60 * 30,
  });
  const { ref } = useInView({
    threshold: 1,
    onChange: (inView) => {
      if (inView && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
  });
  if (isPending) {
    Swal.fire<LoadingAlert>({
      title: "로딩 중...",
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
  } else {
    Swal.close();
  }

  if (error) {
    Swal.fire<ErrorAlert>({
      icon: "error",
      title: "에러 발생!",
      text: "데이터를 불러오는 중에 문제가 발생했습니다.",
      confirmButtonText: "재시도",
      allowOutsideClick: false,
    });
  }

  return (
    <>
      <ul className="w-[80%] mx-auto grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-4">
        {pokemons.map((pokemon, index) => {
          const isLastItem = pokemons.length - 1 === index;
          return (
            <PokemonList
              ref={isLastItem ? ref : null}
              key={pokemon.id}
              pokemon={pokemon}
            />
          );
        })}
      </ul>
      {isFetchingNextPage ? "" : ""}
    </>
  );
}
