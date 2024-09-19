import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import path from "path";
import CreatePokemonDto from "~/lib/dtos/create_pokemon_dto";
import CreatePokemon from "~/lib/actions/pokemons/create_pokemon";

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadDir = path.join(process.cwd(), "/public/uploads");

const createPokemon = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const form = formidable({
      multiples: false,
      uploadDir: uploadDir,
      keepExtensions: true,
    });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error processing file upload", error: err });
      }

      const payload = {
        name: Array.isArray(fields.name) ? fields.name[0] : fields.name,
        number: Array.isArray(fields.number) ? fields.number[0] : fields.number,
        type: Array.isArray(fields.type) ? fields.type[0] : fields.type,
        description: Array.isArray(fields.description)
          ? fields.description[0]
          : fields.description,
        height: Array.isArray(fields.height) ? fields.height[0] : fields.height,
        weight: Array.isArray(fields.weight) ? fields.weight[0] : fields.weight,
        gender_female_ratio: Array.isArray(fields.gender_female_ratio)
          ? fields.gender_female_ratio[0]
          : fields.gender_female_ratio,
        gender_male_ratio: Array.isArray(fields.gender_male_ratio)
          ? fields.gender_male_ratio[0]
          : fields.gender_male_ratio,
        abilities: Array.isArray(fields.abilities)
          ? fields.abilities[0]
          : fields.abilities,
        egg_groups: Array.isArray(fields.egg_groups)
          ? fields.egg_groups[0]
          : fields.egg_groups,
        evolution_description: Array.isArray(fields.evolution_description)
          ? fields.evolution_description[0]
          : fields.evolution_description,
      };

      const pokemonPhoto = files.pokemonPhoto;
      const evolutionPhoto = files.evolutionPhoto;

      const dto = await CreatePokemonDto.create({
        ...payload,
        photo_url:
          pokemonPhoto && pokemonPhoto[0] ? pokemonPhoto[0].newFilename : 'default.png',
        evolution_photo_url:
          evolutionPhoto && evolutionPhoto[0]
            ? evolutionPhoto[0].newFilename
            : 'default.png'
      });

      const pokemon = await CreatePokemon.handle(dto);

      return res.status(200).json(pokemon);
    });
  } catch (error) {
    return res.status(500).json({ message: "Error creating pokemon" });
  }
};

export default createPokemon;
