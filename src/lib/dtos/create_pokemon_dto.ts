export default class CreatePokemonDto {
  public readonly name: string;
  public readonly number: string;
  public readonly photo_url: string;
  public readonly type: string;
  public readonly description: string;
  public readonly height: string;
  public readonly weight: string;
  public readonly gender_female_ratio: string;
  public readonly gender_male_ratio: string;
  public readonly abilities: string;
  public readonly egg_groups: string;
  public readonly evolution_description?: string;
  public readonly evolution_photo_url?: string;

  private constructor(
    name: string,
    number: string,
    photo_url: string,
    type: string,
    description: string,
    height: string,
    weight: string,
    gender_female_ratio: string,
    gender_male_ratio: string,
    abilities: string,
    egg_groups: string,
    evolution_description?: string,
    evolution_photo_url?: string,
  ) {
    this.name = name;
    this.number = number;
    this.photo_url = photo_url;
    this.type = type;
    this.description = description;
    this.height = height;
    this.weight = weight;
    this.gender_female_ratio = gender_female_ratio;
    this.gender_male_ratio = gender_male_ratio;
    this.abilities = abilities;
    this.egg_groups = egg_groups;
    this.evolution_description = evolution_description;
    this.evolution_photo_url = evolution_photo_url;
  }

  public static async create(payload: Record<string, any>) {
    return new CreatePokemonDto(
      payload.name,
      payload.number,
      payload.photo_url,
      payload.type,
      payload.description,
      payload.height,
      payload.weight,
      payload.gender_female_ratio,
      payload.gender_male_ratio,
      payload.abilities,
      payload.egg_groups,
      payload.evolution_description,
      payload.evolution_photo_url,
    );
  }
}
