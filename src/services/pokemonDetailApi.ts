import { PokemonDetailType } from "@/types/pokemon.type";
import axios, { AxiosError } from "axios";
const LOCAL_POKEMON_API_URL = process.env.NEXT_PUBLIC_LOCAL_POKEMON_API_URL;
export const getPokemonDetailData = async (
  id: string
): Promise<PokemonDetailType> => {
  try {
    const { data } = await axios.get<PokemonDetailType>(
      `${LOCAL_POKEMON_API_URL}/${id}`
    );

    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(error);
      throw new Error(
        "getPokemonDetailData Fn Error이니 서버(axios)를 확인하세요."
      );
    } else {
      console.error("예상하지못한 error 발생 =>", error);
      throw new Error("예상치못한오류 발생했습니다.(axios문제아님)");
    }
  }
};
