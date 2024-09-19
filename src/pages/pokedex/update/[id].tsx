import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "~/store";
import { fetchPokemonById, updatePokemon } from "~/store/pokemons/actions";
import Link from "next/link";

export default function UpdatePokedex() {
  const router = useRouter();
  const { id } = router.query;
  const dispatch: AppDispatch = useDispatch();

  const { pokemon, status } = useSelector((state: RootState) => state.pokemon);

  const [formData, setFormData] = useState({
    name: "",
    number: "",
    type: "",
    description: "",
    height: "",
    weight: "",
    gender_female_ratio: "",
    gender_male_ratio: "",
    abilities: "",
    egg_groups: "",
    evolution_description: "",
    photo_url: "",
    evolution_photo_url: "",
    pokemonPhoto: null,
    evolutionPhoto: null,
  });

  useEffect(() => {
    if (id && status === "idle") {
      dispatch(fetchPokemonById(id as string));
    }
  }, [dispatch, status, id]);

  useEffect(() => {
    if (!pokemon) {
      router.push("/pokedex");
      return;
    }

    if (pokemon) {
      setFormData({
        name: pokemon.name || "",
        number: pokemon.number || "",
        type: pokemon.type || "",
        description: pokemon.description || "",
        height: pokemon.height || "",
        weight: pokemon.weight || "",
        gender_female_ratio: pokemon.gender_female_ratio || "",
        gender_male_ratio: pokemon.gender_male_ratio || "",
        abilities: pokemon.abilities || "",
        egg_groups: pokemon.egg_groups || "",
        evolution_description: pokemon.evolution_description || "",
        photo_url: pokemon.photo_url || "",
        evolution_photo_url: pokemon.evolution_photo_url || "",
        pokemonPhoto: null,
        evolutionPhoto: null,
      });
    }
  }, [pokemon]);

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e: { target: { name: any; files: any } }) => {
    const { name, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files[0],
    }));
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const form = new FormData();
    Object.keys(formData).forEach((key) => {
      const typedKey = key as keyof typeof formData;
      if (formData[typedKey]) {
        form.append(typedKey, formData[typedKey] as string | Blob);
      }
    });

    try {
      await dispatch(
        updatePokemon({ pokemon: form, id: id as string }),
      ).unwrap();
      router.push("/pokedex");
    } catch (error) {
      console.error("Error updating pokemon:", error);
    }
  };

  if (status === "loading") return <div>Loading...</div>;
  if (status === "failed") return <div>Error fetching pokemon.</div>;

  return (
    <div className="relative mt-24">
      <div className="container mx-auto mt-12 flex justify-center sm:p-12 lg:p-24">
        <form
          onSubmit={handleSubmit}
          className="relative p-12 sm:w-full lg:w-2/4"
        >
          <div className="absolute inset-0 bg-black opacity-70"></div>
          <div className="relative z-10">
            <h1 className="mb-8 text-left text-2xl font-bold text-white">
              {formData.name || "Update Pokémon"}
            </h1>

            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                  className="input-bg w-full rounded px-4 py-2 text-white"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="number"
                  value={formData.number}
                  onChange={handleChange}
                  placeholder="N° 123"
                  className="input-bg w-full rounded px-4 py-2 text-white"
                />
              </div>
            </div>

            <div className="input-bg mt-5 w-full">
              <label className="mb-2 ml-4 text-gray-400">Pokémon Photo</label>
              <input
                type="file"
                name="pokemonPhoto"
                onChange={handleFileChange}
                className="w-full rounded px-4 py-2 text-white"
              />
              {pokemon && pokemon.photo_url && (
                <div className="ml-4 mt-4">
                  <img
                    src={`/uploads/${pokemon.photo_url}`}
                    alt="Pokémon Preview"
                    className="h-auto w-24 rounded-md"
                  />
                </div>
              )}
            </div>

            <div className="mt-5">
              <input
                type="text"
                name="type"
                value={formData.type}
                onChange={handleChange}
                placeholder="Type"
                className="input-bg w-full rounded px-4 py-2 text-white"
              />
            </div>

            <div className="mt-5">
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
                style={{ height: "150px" }}
                className="input-bg w-full rounded px-4 py-2 text-white"
              />
            </div>

            <div className="mt-5 gap-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
              <div>
                <input
                  type="text"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  placeholder="Height"
                  className="input-bg w-full rounded px-4 py-2 text-white"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  placeholder="Weight"
                  className="input-bg w-full rounded px-4 py-2 text-white"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="gender_female_ratio"
                  value={formData.gender_female_ratio}
                  onChange={handleChange}
                  placeholder="Female Ratio"
                  className="input-bg w-full rounded px-4 py-2 text-white"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="gender_male_ratio"
                  value={formData.gender_male_ratio}
                  onChange={handleChange}
                  placeholder="Male Ratio"
                  className="input-bg w-full rounded px-4 py-2 text-white"
                />
              </div>
            </div>

            <div className="mt-5">
              <input
                type="text"
                name="abilities"
                value={formData.abilities}
                onChange={handleChange}
                placeholder="Abilities"
                className="input-bg w-full rounded px-4 py-2 text-white"
              />
            </div>

            <div className="mt-5">
              <input
                type="text"
                name="egg_groups"
                value={formData.egg_groups}
                onChange={handleChange}
                placeholder="Egg Groups"
                className="input-bg w-full rounded px-4 py-2 text-white"
              />
            </div>

            <div className="mt-5">
              <input
                type="text"
                name="evolution_description"
                value={formData.evolution_description}
                onChange={handleChange}
                placeholder="Evolution Description"
                className="input-bg w-full rounded px-4 py-2 text-white"
              />
            </div>

            <div className="input-bg mt-5 w-full">
              <label className="mb-2 ml-4 text-gray-400">Evolution Photo</label>
              <input
                type="file"
                name="evolutionPhoto"
                onChange={handleFileChange}
                className="w-full rounded px-4 py-2 text-white"
              />
              {pokemon && pokemon.evolution_photo_url && (
                <div className="ml-4 mt-4">
                  <img
                    src={`/uploads/${pokemon.evolution_photo_url}`}
                    alt="Pokémon Preview"
                    className="h-auto w-24 rounded-md"
                  />
                </div>
              )}
            </div>

            <div className="col-span-2 mt-12 flex justify-end">
              <Link href={`/pokedex/${id}`}>
                <button
                  type="button"
                  className="mr-4 rounded bg-white px-4 py-2 text-sm font-bold text-black hover:bg-gray-400"
                >
                  Cancel
                </button>
              </Link>
              <button
                type="submit"
                className="input-bg rounded px-4 py-2 text-sm font-bold text-white hover:bg-green-400"
              >
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
