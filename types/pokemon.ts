export interface AllPokemonsPayload {
  limit: number;
  offset: number;
  filter: string;
}

export interface PokemonPayload {
  name: string;
}

export interface PokemonResponse {
  abilities?: object[];
  base_experience?: number;
  forms?: object[];
  game_indices?: object[];
  height?: number;
  held_items?: object[];
  id?: number;
  is_default?: boolean;
  location_area_encounters?: string;
  moves?: object[];
  name: string;
  order?: number;
  past_types?: any[];
  species?: { name: string; url: string };
  sprites?: {
    back_default?: string;
    back_female?: string;
    back_shiny?: string;
    back_shiny_female?: string;
    front_default?: string;
    front_female?: string;
    front_shiny?: string;
    front_shiny_female?: string;
    other: object;
    versions: object;
  };
  stats?: object[];
  types?: object[];
  weight?: number;
}
