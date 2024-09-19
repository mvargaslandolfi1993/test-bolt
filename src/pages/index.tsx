import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { randomPokemon } from "~/store/pokemons/actions";
import { RootState, AppDispatch } from "~/store";

export default function Home() {
  const dispatch: AppDispatch = useDispatch();
  const { pokemon, status } = useSelector((state: RootState) => state.pokemon);

  useEffect(() => {
    if (status === "idle") {
      dispatch(randomPokemon());
    }
  }, [dispatch, status]);

  const handleSearchClick = () => {
    dispatch(randomPokemon(pokemon?.id));
  };

  if (status === "loading") return <div>Loading...</div>;
  if (status === "failed") return <div>Error fetching pokemons.</div>;

  return (
    <>
      <div className="flex h-screen items-center justify-center">
        <div className="pokedex relative mt-24 p-8">
          <img src="/pokedex.svg" alt="Pokedex" className="w-full" />
          {/* Texto dentro de la Pokédex */}
          <div className="pokedex-screen left-25-percent top-46-percent absolute -translate-x-1/2 -translate-y-1/2 transform">
            <div className="flex items-center justify-between">
              <h6 className="text-left text-base font-bold text-black">
                {pokemon?.name}
              </h6>
              <span className="hide-mobile text-right text-base font-bold text-black">
                Nº {pokemon?.number}
              </span>
            </div>
            <p className="hide-mobile text-9 text-left text-black">Electric</p>
            <p className="hide-mobile text-9 break-words text-left text-black">
              {pokemon?.description}
            </p>
            <div className="hide-mobile mt-1 flex justify-between">
              <p className="text-9 text-left font-bold text-black">Height</p>
              <p className="text-9 text-right text-black">{pokemon?.height}</p>
            </div>
            <div className="hide-mobile flex justify-between">
              <p className="text-9 text-left font-bold text-black">Weight</p>
              <p className="text-9 text-right text-black">{pokemon?.weight}</p>
            </div>
          </div>

          <div>
            <img
              src={`/uploads/${pokemon?.photo_url}`}
              alt={pokemon?.name}
              className="img-pokedex left-55-percent top-55-percent left-77-5-percent absolute -translate-x-1/2 -translate-y-1/2 transform"
            />
          </div>
          {/* Botones dentro de la Pokédex */}
          <div className="bottom-4-1 left-28-4-percent absolute flex -translate-x-full transform space-x-4">
            <button
              className="text-9-mobile rounded-lg px-4 py-2 font-bold text-black"
              onClick={handleSearchClick}
            >
              Search
            </button>
          </div>
          <div className="translate-80-percent bottom-15 absolute left-1/2 flex transform space-x-4">
            <Link href="/pokedex">
              <button className="view-more bg-transparent px-4 py-2 text-xs font-bold text-black">
                View More
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
