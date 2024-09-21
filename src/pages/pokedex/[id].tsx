import { Pencil, Trash, ArrowRight, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { RootState, AppDispatch } from "~/store";
import {
  deletePokemon,
  fetchPokemonById,
  fetchPokemons,
} from "~/store/pokemons/actions";

export default function PokemonDetails() {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;

  const { pokemon, status } = useSelector((state: RootState) => state.pokemon);

  useEffect(() => {
    if (id) {
      dispatch(fetchPokemonById(id as string));
    }
  }, [dispatch, id, router]);

  useEffect(() => {
    if (!pokemon) {
      router.push("/pokedex");
    }
  }, [pokemon]);

  if (status === "loading") return <div>Loading...</div>;
  if (status === "failed") return <div>Error fetching pokemon.</div>;

  if (!pokemon)
    return <div className="text-center text-white">No pokemon available</div>;

  const handleDelete = async () => {
    try {
      const pokemon_id = id as string;
      await dispatch(deletePokemon(pokemon_id)).unwrap();
      await dispatch(fetchPokemons()).unwrap();
      router.push("/pokedex");
    } catch (error) {
      console.error("Error deleting pokemon:", error);
    }
  };

  return (
    <div className="relative mt-24">
      <div className="container mx-auto mt-12 flex justify-center p-24">
        <div className="relative sm:w-full lg:w-11/12 lg:p-12">
          <div className="absolute inset-0 bg-black opacity-70"></div>
          <div className="relative z-10">
            <div className="sm-p-10 container mx-auto">
              <div className="mb-8 flex items-center justify-between">
                <button className="text-white">
                  <Link href="/pokedex">
                    <ArrowLeft className="mr-2" size={25} />
                  </Link>
                </button>

                <div className="flex w-auto space-x-2">
                  {/* Botón de Editar */}
                  <Link href={`/pokedex/update/${pokemon.id}`}>
                    <button className="input-bg flex items-center rounded-md px-4 py-2 text-xs text-white">
                      <Pencil className="mr-2" size={17} />
                      Edit
                    </button>
                  </Link>

                  {/* Botón de Eliminar */}
                  <button
                    className="input-bg flex items-center rounded-md px-4 py-2 text-xs text-white"
                    onClick={handleDelete}
                  >
                    <Trash className="mr-2" size={17} /> Delete
                  </button>
                </div>
              </div>

              <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
                {/* Columna izquierda - Imagen del Pokémon */}
                <div>
                  <img
                    src={pokemon.photo_url}
                    alt={pokemon.name}
                    className="h-auto w-full rounded-md"
                  />
                </div>

                {/* Columna derecha - Información del Pokémon */}
                <div className="space-y-4">
                  <h1 className="text-3xl font-bold text-white">
                    {pokemon.name}
                  </h1>
                  <p className="text-lg text-yellow-500">{pokemon.type}</p>
                  <p className="text-white">{pokemon.description}</p>

                  <div className="flex space-x-20 text-white">
                    <div className="flex flex-col">
                      <p>
                        <strong>Height:</strong>
                      </p>
                      <p>{pokemon.height}</p>
                    </div>

                    <div className="flex flex-col">
                      <p>
                        <strong>Weight:</strong>
                      </p>
                      <p>{pokemon.weight}</p>
                    </div>

                    <div className="flex flex-col">
                      <p>
                        <strong>Gender Ratio:</strong>
                      </p>
                      <p>
                        {pokemon.gender_female_ratio}{" "}
                        {pokemon.gender_male_ratio}
                      </p>
                    </div>
                  </div>

                  {/* Abilities, Egg Groups */}
                  <div className="flex space-x-8 text-white">
                    <div className="flex flex-col">
                      <p>
                        <strong>Abilities:</strong>
                      </p>
                      <p>{pokemon.abilities}</p>
                    </div>

                    <div className="flex flex-col">
                      <p>
                        <strong>Egg Groups:</strong>
                      </p>
                      <p>{pokemon.egg_groups}</p>
                    </div>
                  </div>

                  {/* Evolutions */}
                  <div className="text-white">
                    <h2 className="mb-2 text-2xl font-bold">Evolutions</h2>
                    <p>{pokemon.evolution_description}</p>

                    <div className="mt-4 flex items-center space-x-4">
                      {/* Imagen antes de la evolución */}
                      <img
                        src={pokemon.photo_url}
                        alt="Before Evolution"
                        className="h-auto w-32 rounded-md"
                      />

                      <ArrowRight scale={50} size={50} className="text-white" />

                      {/* Imagen después de la evolución */}
                      <img
                        src={pokemon.evolution_photo_url}
                        alt="After Evolution"
                        className="h-auto w-32 rounded-md"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
