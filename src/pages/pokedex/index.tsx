import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ButtonCreatePokemon from "~/components/ButtonCreatePokemon";
import FilterButton from "~/components/FilterButton";
import PokemonCard from "~/components/PokemanCard";
import SearchBar from "~/components/SearchBar";
import { fetchPokemons } from "~/store/pokemons/actions";
import { RootState, AppDispatch } from "~/store";

export default function Pokedex() {
  const dispatch: AppDispatch = useDispatch();

  const { pokemons, status } = useSelector((state: RootState) => state.pokemon);

  useEffect(() => {
    dispatch(fetchPokemons());
  }, [dispatch]);

  if (status === "loading") return <div>Loading...</div>;
  if (status === "failed") return <div>Error fetching pokemons.</div>;

  return (
    <div className="relative mt-24">
  <div className="container mx-auto mt-12 xs:px-24 md:p-12 lg:p-24">
    <div className="relative p-6 sm:p-8 md:p-10 lg:p-12">
      <div className="absolute inset-0 bg-black opacity-70"></div>

      <div className="relative z-10">
        <h1 className="mb-4 text-left text-2xl sm:text-3xl font-bold text-white">
          Pokédex
        </h1>

        <div className="mb-4 flex flex-col sm:flex-row items-center justify-between">
          <div className="flex items-center space-x-2 mb-4 sm:mb-0">
            <SearchBar />

            <FilterButton />
          </div>

          <ButtonCreatePokemon />
        </div>

        <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-5 gap-4 md:gap-5">
          {pokemons.length > 0 ? (
            pokemons.map((pokemon) => (
              <PokemonCard key={pokemon.id} {...pokemon} />
            ))
          ) : (
            <div>No pokemons available</div>
          )}
        </div>
      </div>
    </div>
  </div>
</div>

  );
}
