import React from "react";
import Image from "next/image";
import { PokemonDetailType } from "@/types/pokemon.type";
import axios, { AxiosError } from "axios";
import Backbutton from "@/components/Backbutton";
import { Metadata } from "next";
import { getPokemonDetailData } from "@/services/pokemonDetailApi";
const LOCAL_POKEMON_API_URL = process.env.NEXT_PUBLIC_LOCAL_POKEMON_API_URL;
const randomColorClasses: string[] = [
  "bg-red-700",
  "bg-green-700",
  "bg-blue-700",
  "bg-yellow-700",
  "bg-purple-700",
  "bg-pink-700",
  "bg-indigo-700",
  "bg-gray-700",
];

const getRandomColorClass = (): string => {
  const randomIndex: number = Math.floor(
    Math.random() * randomColorClasses.length
  );
  return randomColorClasses[randomIndex];
};

const PokemonDetailPage = async ({
  params,
}: {
  params: { id: string };
}): Promise<React.ReactElement> => {
  const id = params.id;
  const data = await getPokemonDetailData(id);
  return (
    <>
      <header className="bg-slate-300 py-2 mb-4 relative">
        <h1 className="text-center font-bold text-xl tracking-widest">
          {data.korean_name}
        </h1>
        <p className="text-center">No.{data.id.toString().padStart(4, "0")}</p>
        <Backbutton
          style={
            "absolute left-20 top-1/2 transform -translate-y-1/2 bg-red-600 text-white px-2 py-1 text-sm box-border rounded"
          }
        />
      </header>
      <div className="flex items-center justify-center gap-20 h-[300px]">
        <div className="w-40">
          <Image
            src={data.sprites}
            alt="pokemon img"
            width={100}
            height={100}
            className="w-full h-full block transform -scale-x-100"
          />
        </div>

        <div className="flex justify-between flex-col gap-4">
          <div className="flex gap-4 flex-wrap">
            <p className="font-bold">키 : {(data.height / 10).toFixed(1)}M</p>
            <p className="font-bold">
              무게 : {(data.weight / 10).toFixed(1)}Kg
            </p>
          </div>
          <div className="flex gap-2 items-center">
            <p className="font-bold">타입 : </p>
            <ul className="flex gap-2 flex-wrap">
              {data.types.map((item, index) => (
                <li
                  key={`type-${index}`}
                  className="bg-amber-600 text-white px-2 py-1 text-sm box-border rounded"
                >
                  {item.type.korean_name}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex gap-2 items-center">
            <p className="font-bold">특성 : </p>
            <ul className="flex gap-2 flex-wrap">
              {data.abilities.map((item, index) => (
                <li
                  key={`abilities-${index}`}
                  className="bg-fuchsia-800 text-white px-2 py-1 text-sm box-border rounded"
                >
                  {item.ability.korean_name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="flex items-start gap-4 mx-auto w-2/3 mt-10 justify-around mb-10">
        <p className="font-bold w-[50px]">기술:</p>
        <ul className="flex flex-wrap justify-start gap-2 w-11/12">
          {data.moves.map((item, index) => (
            <li
              key={`skill-${index}`}
              className={`text-white px-2 py-1 text-sm box-border rounded ${getRandomColorClass()}`}
            >
              {item.move.korean_name}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default PokemonDetailPage;

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<{ title: string; description: string }> {
  try {
    const { id } = params;
    const { data } = await axios.get<PokemonDetailType>(
      `${LOCAL_POKEMON_API_URL}/${id}`
    );
    return {
      title: data.korean_name,
      description: `${data.korean_name}에 대한 포켓몬 정보`,
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(error);
      throw new Error("generateMetadata의 axiox오류");
    } else {
      return {
        title: "Error",
        description: "포켓몬 정보를 불러오는 중에 오류가 발생했습니다.",
      };
    }
  }
}
