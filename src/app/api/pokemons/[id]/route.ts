import { NextResponse } from "next/server";
import axios, { AxiosError } from "axios";
import {
  PokemonAPIResponse,
  PokemonAbilityURLResponse,
  PokemonMoveURLResponse,
  PokemonSpeciesAPIResponse,
  PokemonTypeURLResponse,
} from "@/types/pokemon.type";
const POKEAPI_POKEMON_URL = process.env.NEXT_PUBLIC_POKEAPI_POKEMON_URL;
const POKEAPI_SPECIES_URL = process.env.NEXT_PUBLIC_POKEAPI_SPECIES_URL;
export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const { id } = params;

  try {
    const [response, speciesResponse] = await Promise.all([
      axios.get<PokemonAPIResponse>(`${POKEAPI_POKEMON_URL}/${id}`),
      axios.get<PokemonSpeciesAPIResponse>(`${POKEAPI_SPECIES_URL}/${id}`),
    ]);

    const koreanName = speciesResponse.data.names?.find(
      (name) => name.language.name === "ko"
    );

    const typesWithKoreanNames = await Promise.all(
      response.data.types.map(async (type) => {
        const typeResponse = await axios.get<PokemonTypeURLResponse>(
          type.type.url
        );
        const koreanTypeName =
          typeResponse.data.names?.find((name) => name.language.name === "ko")
            ?.name || type.type.name;
        return { ...type, type: { ...type.type, korean_name: koreanTypeName } };
      })
    );

    const abilitiesWithKoreanNames = await Promise.all(
      response.data.abilities.map(async (ability) => {
        const abilityResponse = await axios.get<PokemonAbilityURLResponse>(
          ability.ability.url
        );
        const koreanAbilityName =
          abilityResponse.data.names?.find(
            (name) => name.language.name === "ko"
          )?.name || ability.ability.name;
        return {
          ...ability,
          ability: { ...ability.ability, korean_name: koreanAbilityName },
        };
      })
    );

    const movesWithKoreanNames = await Promise.all(
      response.data.moves.map(async (move) => {
        const moveResponse = await axios.get<PokemonMoveURLResponse>(
          move.move.url
        );
        const koreanMoveName =
          moveResponse.data.names?.find((name) => name.language.name === "ko")
            ?.name || move.move.name;
        return { ...move, move: { ...move.move, korean_name: koreanMoveName } };
      })
    );
    const pokemonData = {
      // ...response.data,
      sprites: response.data.sprites.other.dream_world.front_default,
      korean_name: koreanName?.name || response.data.name,
      types: typesWithKoreanNames,
      abilities: abilitiesWithKoreanNames,
      moves: movesWithKoreanNames,
      weight: response.data.weight,
      height: response.data.height,
      id: response.data.id,
    };

    return NextResponse.json(pokemonData);
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
