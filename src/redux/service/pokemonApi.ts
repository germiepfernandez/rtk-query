import { createApi, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { getBaseQuery } from "../baseQuery";

export interface PokemonListResponse {
	count: number;
	next: string | null;
	previous: string | null;
	results: Array<{ name: string; url: string }>;
}

export interface Stats {
	base_stat: number;
	stat: string;
}

export interface Pokemon {
	id: number;
	name: string;
	sprites: {
		back_default: string;
		front_default: string;
	};
	stats: Array<Stats>;
}

export const pokemonApi = createApi({
	reducerPath: "pokemonApi",
	baseQuery: getBaseQuery(),
	tagTypes: [],
	endpoints: (builder) => ({
		fetchPokemonList: builder.query<Pokemon[], void>({
			async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
				const pokemonResult = await fetchWithBQ("pokemon?limit=60");
				if (pokemonResult.error) {
					return {
						error: pokemonResult.error as FetchBaseQueryError,
					};
				}

				const data = pokemonResult.data as PokemonListResponse;
				const prms = data.results.reduce<Promise<any>[]>((a, e, index) => {
					a.push(fetch(e.url));
					return a;
				}, []);

				const response = await Promise.all(prms);
				let parsed = await Promise.all(response.map((e) => e.json()));
				parsed = parsed.map((e) => ({
					...e,
					stats: e.stats.map((s: any) => ({
						base_stat: s.base_stat,
						stat: s.stat.name,
					})),
				}));

				return { data: parsed as Pokemon[] };
			},
		}),
	}),
});

export const { useFetchPokemonListQuery } = pokemonApi;