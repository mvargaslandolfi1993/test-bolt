import type { NextApiRequest, NextApiResponse } from "next";
import GetPokemons from "~/lib/actions/pokemons/get_pokemons";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const pokemons = await GetPokemons.handle(req.query);
    res.status(200).json(pokemons);
  } catch (error) {
    res.status(500).json({ message: "Error getting pokemons" });
  }
}
