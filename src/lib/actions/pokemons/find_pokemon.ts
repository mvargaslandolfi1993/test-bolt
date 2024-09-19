import { db } from "~/server/db";

export default class FindPokemon {
  static async handle(id: number) {
    const pokemon = await db.pokemons.findUnique({
      where: {
        id: id,
      },
    });
    return { data: pokemon };
  }
}
