import type { NextApiRequest, NextApiResponse } from "next";
import DeletePokemon from "~/lib/actions/pokemons/delete_pokemon";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    await DeletePokemon.handle(Number(req.query.id));
    res.status(200).json({ message: "Pokemon deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting pokemon" });
  }
}
