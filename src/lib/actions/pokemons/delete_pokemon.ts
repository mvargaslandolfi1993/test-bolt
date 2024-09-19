import { db } from "~/server/db";

export default class DeletePokemon {
  static async handle(id: number) {
    await db.pokemons.delete({
      where: {
        id: id,
      },
    });

    return { message: "Deleted" };
  }
}
