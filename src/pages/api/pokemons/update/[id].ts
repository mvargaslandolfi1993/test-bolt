import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import fs from "fs/promises";
import { put } from "@vercel/blob";
import path from "path";
import CreatePokemonDto from "~/lib/dtos/create_pokemon_dto";
import UpdatePokemon from "~/lib/actions/pokemons/update_pokemon";

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const form = formidable({
      multiples: false,
      keepExtensions: true,
    });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error processing file upload", error: err });
      }

      const id = Number(req.query.id);

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
        photo_url: Array.isArray(fields.photo_url)
          ? fields.photo_url[0]
          : fields.photo_url,
        evolution_photo_url: Array.isArray(fields.evolution_photo_url)
          ? fields.evolution_photo_url[0]
          : fields.evolution_photo_url,
      };

      const uploadToBlob = async (
        file: formidable.File | formidable.File[],
      ) => {
        if (!file) return null;
        const uploadedFile = Array.isArray(file) ? file[0] : file;

        if (!uploadedFile) {
          throw new Error("Uploaded file is undefined");
        }

        const fileData = await fs.readFile(uploadedFile.filepath);

        const blob = await put(uploadedFile.newFilename, fileData, {
          access: "public",
        });

        return blob.url;
      };

      const pokemonPhotoUrl = files.pokemonPhoto
        ? await uploadToBlob(files.pokemonPhoto)
        : payload.photo_url;
      const evolutionPhotoUrl = files.evolutionPhoto
        ? await uploadToBlob(files.evolutionPhoto)
        : payload.evolution_photo_url;

      const dto = await CreatePokemonDto.create({
        ...payload,
        photo_url: pokemonPhotoUrl,
        evolution_photo_url: evolutionPhotoUrl,
      });

      const pokemon = await UpdatePokemon.handle(id, dto);

      return res.status(200).json(pokemon);
    });
  } catch (error) {
    return res.status(500).json({ message: "Error updating pokemon", error });
  }
};

export default handler;
