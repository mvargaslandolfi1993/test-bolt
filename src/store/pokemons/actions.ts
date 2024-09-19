import { createAsyncThunk } from "@reduxjs/toolkit";

interface UpdatePokemonArgs {
  pokemon: FormData;
  id: string;
}

export const fetchPokemons = createAsyncThunk(
  "pokemon/fetchPokemons",
  async () => {
    const response = await fetch("/api/pokemons");
    if (!response.ok) throw new Error("Failed to fetch pokemons");
    return response.json();
  },
);

export const fetchPokemonById = createAsyncThunk(
  "pokemon/fetchPokemonById",
  async (id: string) => {
    const response = await fetch(`/api/pokemons/${id}`);
    if (!response.ok) throw new Error("Failed to fetch pokemon");
    return response.json();
  },
);

export const createPokemon = createAsyncThunk(
  "pokemon/createPokemon",
  async (pokemon: FormData) => {
    const response = await fetch("/api/pokemons/store", {
      method: "POST",
      body: pokemon,
    });
    if (!response.ok) throw new Error("Failed to create pokemon");
    return response.json();
  },
);

export const updatePokemon = createAsyncThunk<FormData, UpdatePokemonArgs>(
  "pokemon/updatePokemon",
  async ({ pokemon, id }) => {
    const response = await fetch(`/api/pokemons/update/${id}`, {
      method: "POST",
      body: pokemon,
    });
    if (!response.ok) throw new Error("Failed to update pokemon");
    return response.json();
  },
);

export const deletePokemon = createAsyncThunk(
  "pokemon/deletePokemon",
  async (id: string) => {
    const response = await fetch(`/api/pokemons/delete/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete pokemon");
    return id;
  },
);

export const randomPokemon = createAsyncThunk(
  "pokemon/randomPokemon",
  async (currentPokemonId?: number | null) => {
    const response = await fetch(
      `/api/pokemons/random?exclude_id=${currentPokemonId}`,
    );
    if (!response.ok) throw new Error("Failed to fetch random pokemon");
    return response.json();
  },
);
