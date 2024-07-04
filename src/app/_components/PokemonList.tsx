import { Pokemons } from "@/types/pokemon.type";
import Image from "next/image";
import Link from "next/link";
import React, { forwardRef } from "react";

const PokemonList = forwardRef<HTMLLIElement, { pokemon: Pokemons }>(
  ({ pokemon }, ref): React.ReactElement => {
    return (
      <li
        className="shadow-lg p-3 box-border rounded-xl cursor-pointer hover:scale-105 ease-in-out transition"
        ref={ref}
      >
        <Link href={`/pokemon/${pokemon.id}`}>
          <div className="w-max mx-auto mb-4">
            <Image
              src={pokemon.sprites}
              alt="pokemon img"
              width={80}
              height={80}
              className="w-16 h-16"
            />
          </div>
          <h3>{pokemon.korean_name}</h3>
          <h2>도감 번호 : {pokemon.id}</h2>
        </Link>
      </li>
    );
  }
);
PokemonList.displayName = "PokemonList";
export default PokemonList;
