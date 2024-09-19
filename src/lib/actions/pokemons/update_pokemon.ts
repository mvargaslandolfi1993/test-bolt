import { db } from "~/server/db";
import CreatePokemonDto from "~/lib/dtos/create_pokemon_dto";

export default class UpdatePokemon {
  static async handle(id: number, payload: CreatePokemonDto) {
    const pokemon = await db.pokemons.update({
      where: {
        id: id,
      },
      data: {
        name: payload.name,
        number: payload.number,
        photo_url: payload.photo_url,
        type: payload.type,
        description: payload.description,
        height: payload.height,
        weight: payload.weight,
        gender_female_ratio: payload.gender_female_ratio,
        gender_male_ratio: payload.gender_male_ratio,
        abilities: payload.abilities,
        egg_groups: payload.egg_groups,
        evolution_description: payload.evolution_description,
        evolution_photo_url: payload.evolution_photo_url,
      },
    });

    return { data: pokemon };
  }
}
