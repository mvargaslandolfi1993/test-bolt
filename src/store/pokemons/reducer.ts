import { createSlice } from "@reduxjs/toolkit";
import {
  fetchPokemons,
  fetchPokemonById,
  createPokemon,
  updatePokemon,
  deletePokemon,
  randomPokemon,
} from "./actions";
import IPokemon from "./interface";

interface PokemonState {
  pokemons: IPokemon[];
  pokemon: IPokemon | null;
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: PokemonState = {
  pokemons: [],
  pokemon: null,
  status: "idle",
};

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    setSelectedPokemon(state, action: Record<string, any>) {
      state.pokemon = action.payload.data;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemons.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPokemons.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.pokemons = action.payload.data;
      })
      .addCase(fetchPokemons.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(
        fetchPokemonById.fulfilled,
        (state, action: Record<string, any>) => {
          state.pokemon = action.payload.data;
          state.status = "succeeded";
        },
      )
      .addCase(
        createPokemon.fulfilled,
        (state, action: Record<string, any>) => {
          state.pokemons.push(action.payload.data);
        },
      )
      .addCase(
        updatePokemon.fulfilled,
        (state, action: Record<string, any>) => {
          const index = state.pokemons.findIndex(
            (pokemon) => pokemon.id === action.payload.data.id,
          );
          if (index !== -1) {
            state.pokemons[index] = action.payload.data;
          }
        },
      )
      .addCase(
        deletePokemon.fulfilled,
        (state, action: Record<string, any>) => {
          state.pokemons = state.pokemons.filter(
            (pokemon) => pokemon.id !== action.payload.id,
          );
        },
      )
      .addCase(
        randomPokemon.fulfilled,
        (state, action: Record<string, any>) => {
          state.pokemon = action.payload.data;
        },
      );
  },
});

export const { setSelectedPokemon } = pokemonSlice.actions;

export default pokemonSlice.reducer;
