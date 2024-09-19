export default interface IPokemon {
  id: number;
  name: string;
  number: string;
  photo_url: string;
  type: string;
  description: string;
  height: string;
  weight: string;
  gender_female_ratio: string;
  gender_male_ratio: string;
  abilities: string;
  egg_groups: string;
  evolution_description?: string;
  evolution_photo_url?: string;
}
