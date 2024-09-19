import type { NextApiRequest, NextApiResponse } from "next";
import FindPokemon from "~/lib/actions/pokemons/find_pokemon";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const pokemon = await FindPokemon.handle(Number(req.query.id));
    res.status(200).json(pokemon);
  } catch (error) {
    res.status(500).json({ message: "Error getting pokemon" });
  }
}
