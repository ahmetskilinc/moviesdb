// types
import type { HomeProps } from "../models/props";
import type { Movies } from "../models/movie_popular";
import type { TvPopular } from "../models/tv_popular";
import type { HomeHero as HomeHeroType } from "../models/home_hero";

import { default as dynamicComponentLoader } from "next/dynamic";

export const dynamic = "force-dynamic";

const HomeHero = dynamicComponentLoader(() => import("../components/HomeHero"), {
	ssr: false,
});

import { key, endpoint } from "../lib/api_lib";

// components
import Head from "next/head";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";
import MoviesList from "../components/MoviesList";

const getHomeHero = async () => {
	let returnObject: HomeHeroType[] = [];
	await axios.get(`${endpoint}trending/movie/day?${key}`).then((response) => {
		response.data.results.slice(0, 2).map((item: HomeHeroType) => {
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

	await axios.get(`${endpoint}trending/tv/day?${key}`).then((response) => {
		response.data.results.slice(0, 2).map((item: HomeHeroType) => {
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
	return await axios.get(`${endpoint}movie/popular?${key}&language=en-US&page=1`).then((response) => {
		return response.data.results.map((item: Movies.Result) => {
			return {
				id: item.id,
				title: item.title,
				poster_path: item.poster_path,
			};
		});
	});
};

const getTvPopular = async () => {
	return await axios.get(`${endpoint}tv/popular?${key}&language=en-US&page=1`).then((response) => {
		return response.data.results.map((item: TvPopular.Result) => {
			return {
				id: item.id,
				name: item.name,
				poster_path: item.poster_path,
			};
		});
	});
};

const Page = async () => {
	const homeHero = await getHomeHero();
	const moviesPopular = await getMoviesPopular();
	const tvPopular = await getTvPopular();

	return (
		<>
			<Head>
				<title>MovieDB</title>
				<meta name="description" content="MovieDB - Find films and movies from everywhere." />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main>
				{homeHero !== null && moviesPopular !== null && tvPopular !== null ? (
					<>
						<HomeHero movies={homeHero} />
						<MoviesList movies={moviesPopular} listTitle="Popular movies this week" type="movie" compact={false} />
						<div className="divider"></div>
						<MoviesList movies={tvPopular} listTitle="Popular TV shows this week" type="tv" compact={false} />
					</>
				) : (
					<LoadingSpinner />
				)}
			</main>
		</>
	);
};

export default Page;
