import { endpoint, key } from "@/lib/api_lib";
import type { HomeHero } from "@/models/home_hero";
import { Movies } from "@/models/movie_popular";
import { TvPopular } from "@/models/tv_popular";

export const revalidate = 60;
export const runtime = "edge";

export async function GET(request: Request) {
	let homeHero: HomeHero[] = [];

	const heroMoviesRes = await fetch(`${endpoint}trending/movie/day?${key}`, {
		headers: {
			"Content-Type": "application/json",
		},
	});
	(await heroMoviesRes.json()).results.slice(0, 2).map((item: HomeHero) => {
		homeHero.push({
			poster_path: item.poster_path,
			title: item.title,
			overview: item.overview,
			id: item.id,
			backdrop_path: item.backdrop_path,
			type: "movie",
			hero_title: "Trending Movie",
		} as HomeHero);
	});

	const heroTvRes = await fetch(`${endpoint}trending/tv/day?${key}`, {
		headers: {
			"Content-Type": "application/json",
		},
	});
	(await heroTvRes.json()).results.slice(0, 2).map((item: HomeHero) => {
		homeHero.push({
			poster_path: item.poster_path,
			title: item.title,
			overview: item.overview,
			id: item.id,
			backdrop_path: item.backdrop_path,
			type: "movie",
			hero_title: "Trending Movie",
		} as HomeHero);
	});

	const moviesRes = await fetch(`${endpoint}movie/popular?language=en-US&page=1&${key}`, {
		headers: {
			"Content-Type": "application/json",
		},
	});
	const movies = (await moviesRes.json()).results.map((item: Movies.Result) => {
		return {
			id: item.id,
			title: item.title,
			poster_path: item.poster_path,
		};
	});

	const tvRes = await fetch(`${endpoint}tv/popular?language=en-US&page=1&${key}`, {
		headers: {
			"Content-Type": "application/json",
		},
	});
	const tv = (await tvRes.json()).results.map((item: TvPopular.Result) => {
		return {
			id: item.id,
			name: item.name,
			poster_path: item.poster_path,
		};
	});

	return Response.json({
		homeHero,
		moviesPopular: movies,
		tvPopular: tv,
	});
}
