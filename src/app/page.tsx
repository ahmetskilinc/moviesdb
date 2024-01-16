import type { HomeHero as HomeHeroType } from "../models/home_hero";
import type { Movies } from "../models/movie_popular";
import type { TvPopular } from "../models/tv_popular";
import { getList } from "@/_api/getList";
import LoadingSpinner from "../components/LoadingSpinner";
import MoviesList from "../components/MoviesList";
import { default as dynamicComponentLoader } from "next/dynamic";

const HomeHero = dynamicComponentLoader(() => import("../components/HomeHero"), {
	ssr: false,
});

export const dynamic = "force-dynamic";

const getHomeHero = async () => {
	let returnObject: HomeHeroType[] = [];
	await getList(`trending/movie/day?`).then((response) => {
		response.results.slice(0, 2).map((item: HomeHeroType) => {
			returnObject.push({
				poster_path: item.poster_path,
				title: item.title,
				overview: item.overview,
				id: item.id,
				backdrop_path: item.backdrop_path,
				type: "movie",
				hero_title: "Trending Movie",
			} as HomeHeroType);
		});
	});

	await getList(`trending/tv/day?`).then((response) => {
		response.results.slice(0, 2).map((item: HomeHeroType) => {
			returnObject.push({
				poster_path: item.poster_path,
				name: item.name,
				overview: item.overview,
				id: item.id,
				backdrop_path: item.backdrop_path,
				type: "tv",
				hero_title: "Trending TV",
			} as HomeHeroType);
		});
	});

	return returnObject;
};

const getMoviesPopular = async () => {
	return await getList(`movie/popular?language=en-US&page=1&`).then((response) => {
		return response.results.map((item: Movies.Result) => {
			return {
				id: item.id,
				title: item.title,
				poster_path: item.poster_path,
			};
		});
	});
};

const getTvPopular = async () => {
	return await getList(`tv/popular?language=en-US&page=1&`).then((response) => {
		return response.results.map((item: TvPopular.Result) => {
			return {
				id: item.id,
				name: item.name,
				poster_path: item.poster_path,
			};
		});
	});
};

export default async function Page() {
	const homeHero = await getHomeHero();
	const moviesPopular = await getMoviesPopular();
	const tvPopular = await getTvPopular();

	return homeHero !== null && moviesPopular !== null && tvPopular !== null ? (
		<>
			<HomeHero movies={homeHero} />
			<MoviesList movies={moviesPopular} listTitle="Popular movies this week" type="movie" compact={false} />
			<div className="divider"></div>
			<MoviesList movies={tvPopular} listTitle="Popular TV shows this week" type="tv" compact={false} />
		</>
	) : (
		<LoadingSpinner />
	);
}

export const metadata = {
	title: "MoviesDB",
};
