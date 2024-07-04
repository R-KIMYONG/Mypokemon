import { Pokemons } from "@/types/pokemon.type";
import axios, { AxiosError } from "axios";
const LOCAL_POKEMON_API_URL = process.env.NEXT_PUBLIC_LOCAL_POKEMON_API_URL;
export const getPokemonsData = async (): Promise<Pokemons[]> => {
  try {
    const { data } = await axios.get<Pokemons[]>(`${LOCAL_POKEMON_API_URL}`);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("Axios Error Failed to fetch data=>", error.message);
      throw new Error("Failed to fetch data");
    } else {
      console.error("예상치 못한 오류입니다.axios오류아님", error);
      throw new Error("getPokemonsData Fn 예상치 뫃한 오류발생");
    }
  }
};
