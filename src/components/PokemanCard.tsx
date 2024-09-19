import Link from "next/link";
import React from "react";
import IPokemon from "~/store/pokemons/interface";

const PokemonCard = (pokemon: IPokemon) => {
  return (
    <Link href={`/pokedex/${pokemon.id}`}>
      <div className="rounded-md border border-transparent bg-[#272727] p-4 text-center opacity-100">
        <img
          src={`/uploads/${pokemon.photo_url}`}
          alt={pokemon.name}
          className="mx-auto mb-2 h-48 w-48 object-cover"
        />
        <p className="font-bold text-white">N° {pokemon.number}</p>
        <p className="text-lg text-white">{pokemon.name}</p>
        <p className="text-sm text-white">{pokemon.type}</p>
      </div>
    </Link>
  );
};

export default PokemonCard;
