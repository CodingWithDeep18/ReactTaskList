import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Pokemon {
  name: string;
  url: string;
}

interface PokemonListResponse {
  results: Pokemon[];
}

export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/" }),
  endpoints: (builder) => ({
    getPokemonList: builder.query<PokemonListResponse, { limit?: number; offset?: number }>({
      query: ({ limit = 10, offset = 0 }) => `pokemon?limit=${limit}&offset=${offset}`,
      cacheTime: 12 * 60 * 1000, 
    }),
  }),
});

export const { useGetPokemonListQuery } = pokemonApi;
