import { db } from "~/server/db";

export default class RandomPokemon {
  static async handle(query: Record<string, any> = {}) {
    const excludeId = query.exclude_id
      ? parseInt(query.exclude_id as string, 10)
      : undefined;

    const pokemons = await db.pokemons.findMany({
      where: excludeId ? { id: { not: excludeId } } : {},
    });

    if (pokemons.length === 0) {
      return { data: [] };
    }

    const randomIndex = Math.floor(Math.random() * pokemons.length);

    return { data: pokemons[randomIndex] };
  }
}
