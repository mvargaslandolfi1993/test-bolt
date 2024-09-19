import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPokemon } from "~/store/pokemons/actions";
import { RootState, AppDispatch } from "~/store";
import { useRouter } from "next/router";
import Link from "next/link";

export default function CreatePokedex() {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();

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
    pokemonPhoto: null,
    evolutionPhoto: null,
  });

  const { status } = useSelector((state: RootState) => state.pokemon);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const pokemonFormData = new FormData();

      Object.keys(formData).forEach((key) => {
        const typedKey = key as keyof typeof formData;
        if (formData[typedKey]) {
          pokemonFormData.append(typedKey, formData[typedKey] as string | Blob);
        }
      });

      await dispatch(createPokemon(pokemonFormData)).unwrap();
      router.push("/pokedex");
    } catch (error) {
      console.error("Error deleting pokemon:", error);
    }
  };

  return (
    <div className="relative mt-24">
      <div className="container mx-auto mt-12 flex justify-center sm:p-12 lg:p-24">
        <div className="relative p-12 sm:w-full lg:w-2/4">
          <div className="absolute inset-0 bg-black opacity-70"></div>
          <div className="relative z-10">
            <h1 className="mb-8 text-left text-2xl font-bold text-white">
              Nuevo Pokemon
            </h1>

            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                  className="input-bg w-full rounded px-4 py-2 text-white"
                />
                <input
                  type="text"
                  name="number"
                  value={formData.number}
                  onChange={handleChange}
                  placeholder="N° 123"
                  className="input-bg w-full rounded px-4 py-2 text-white"
                />
              </div>

              <div className="input-bg mt-5 w-full">
                <label className="mb-2 ml-4 text-gray-400">Pokémon Photo</label>
                <input
                  type="file"
                  name="pokemonPhoto"
                  onChange={handleFileChange}
                  className="w-full rounded px-4 py-2 text-white"
                />
              </div>

              <input
                type="text"
                name="type"
                value={formData.type}
                onChange={handleChange}
                placeholder="Type"
                className="input-bg mt-5 w-full rounded px-4 py-2 text-white"
              />

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
                style={{ height: "150px" }}
                className="input-bg mt-5 w-full rounded px-4 py-2 text-white"
              />

              <div className="mt-5 gap-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
                <input
                  type="text"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  placeholder="Height"
                  className="input-bg w-full rounded px-4 py-2 text-white"
                />
                <input
                  type="text"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  placeholder="Weight"
                  className="input-bg w-full rounded px-4 py-2 text-white"
                />
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
                <input
                  type="text"
                  name="gender_male_ratio"
                  placeholder="Genter ratio"
                  value={formData.gender_male_ratio}
                  onChange={handleChange}
                  className="input-bg w-full rounded px-4 py-2 text-white"
                />
                <input
                  type="text"
                  placeholder="Genter ratio"
                  name="gender_female_ratio"
                  value={formData.gender_female_ratio}
                  onChange={handleChange}
                  className="input-bg w-full rounded px-4 py-2 text-white"
                />
              </div>

              <input
                type="text"
                name="abilities"
                value={formData.abilities}
                onChange={handleChange}
                placeholder="Abilities"
                className="input-bg mt-5 w-full rounded px-4 py-2 text-white"
              />

              <input
                type="text"
                name="egg_groups"
                value={formData.egg_groups}
                onChange={handleChange}
                placeholder="Egg Groups"
                className="input-bg mt-5 w-full rounded px-4 py-2 text-white"
              />

              <input
                type="text"
                name="evolution_description"
                value={formData.evolution_description}
                onChange={handleChange}
                placeholder="Evolution Description"
                className="input-bg mt-5 w-full rounded px-4 py-2 text-white"
              />

              <div className="input-bg mt-5 w-full">
                <label className="mb-2 ml-4 text-gray-400">
                  Evolution Photo
                </label>
                <input
                  type="file"
                  name="evolutionPhoto"
                  onChange={handleFileChange}
                  className="w-full rounded px-4 py-2 text-white"
                />
              </div>

              <div className="col-span-2 mt-12 flex justify-end">
                <Link href="/pokedex">
                  <button className="mr-4 rounded bg-white px-4 py-2 text-sm font-bold text-black hover:bg-gray-400">
                    Cancel
                  </button>
                </Link>
                <button
                  type="submit"
                  className="input-bg rounded px-4 py-2 text-sm font-bold text-white hover:bg-green-400"
                >
                  {status === "loading" ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
