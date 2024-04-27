import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Pokemon {
  name: string;
  url: string;
}

interface PokemonListResponse {
  results: Pokemon[];
  count: number;
}

export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/" }),
  endpoints: (builder) => ({
    getPokemonList: builder.query<PokemonListResponse, { limit?: number; offset?: number; search?: string }>({
      query: ({ limit = 10, offset = 0, search = "" }) => `pokemon?limit=${limit}&offset=${offset}&search=${encodeURIComponent(search)}`,
    }),
  }),
});

export const { useGetPokemonListQuery } = pokemonApi;
