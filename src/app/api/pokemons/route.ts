import { NextResponse } from "next/server";
import axios, { AxiosError, AxiosResponse } from "axios";
import {
  PokemonAPIResponse,
  PokemonSpeciesAPIResponse,
} from "@/types/pokemon.type";

const TOTAL_POKEMON = 200;

export const GET = async (request: Request) => {
  try {
    //-----------------------------GPT도움받은 부분-----------------------------------
    const url: URL = new URL(request.url);
    const page = parseInt(url.searchParams.get("_page") || "1", 10);
    const limit = parseInt(url.searchParams.get("_limit") || "10", 10);
    const offset = (page - 1) * limit;
    //----------------------------------------------------------------
    const allPokemonPromises = Array.from({ length: limit }, (_, index) => {
      const id = offset + index + 1;
      return id <= TOTAL_POKEMON
        ? Promise.all([
            axios.get<PokemonAPIResponse>(
              `https://pokeapi.co/api/v2/pokemon/${id}`
            ), // 포켓몬의 한글 이름을 제외한 나머지 정보를 가져오는 API다.
            axios.get<PokemonSpeciesAPIResponse>(
              `https://pokeapi.co/api/v2/pokemon-species/${id}`
            ), // 포켓몬의 한글 이름을 가져오는 API다.
          ])
        : null;
    }).filter(Boolean);

    const validPokemonPromises = allPokemonPromises.filter(
      (
        promise
      ): promise is Promise<
        [
          AxiosResponse<PokemonAPIResponse>,
          AxiosResponse<PokemonSpeciesAPIResponse>
        ]
      > => promise !== null
    );

    const allPokemonResponses = await Promise.all(validPokemonPromises);

    const allPokemonData = allPokemonResponses
      .filter(Boolean)
      .map(([response, speciesResponse]) => {
        const koreanName = speciesResponse.data.names.find(
          (name) => name.language.name === "ko"
        );
        const pokemonData = {
          id: response.data.id,
          weight: response.data.weight,
          height: response.data.height,
          types: response.data.types,
          korean_name: koreanName?.name || null,
          sprites: response.data.sprites.other.dream_world.front_default,
        };
        return pokemonData;
      });

    return NextResponse.json(allPokemonData);
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("Axios Error Failed to fetch data=>", error.message);
      throw new Error("Failed to fetch data");
    } else {
      console.error("Error fetching Pokemon data:", error);
      return NextResponse.json({ error: "Failed to fetch data" });
    }
  }
};
