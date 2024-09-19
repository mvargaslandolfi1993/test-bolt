import type { NextApiRequest, NextApiResponse } from "next";
import RandonPokemon from "~/lib/actions/pokemons/random_pokemon";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const pokemons = await RandonPokemon.handle(req.query);
    res.status(200).json(pokemons);
  } catch (error) {
    res.status(500).json({ message: "Error getting random pokemons" });
  }
}
