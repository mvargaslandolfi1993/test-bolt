import { db } from "~/server/db";

export default class GetPokemons {
  static async handle(query: Record<string, any>) {
    const pokemons = await db.pokemons.findMany({
      where: {
        name: {
          contains: query.name as string,
        },
      },
    });
    return { data: pokemons };
  }
}
