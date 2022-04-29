export interface AllPokemonsPayload {
  limit: number;
  offset: number;
}

export interface AllPokemonsResponse {
  count: number;
  next?: string;
  previous?: string;
  results: {
    name: string;
    url: string;
  }[];
}
