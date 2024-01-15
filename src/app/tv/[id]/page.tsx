import Head from "next/head";
import Hero from "../../../components/Hero";
import Cast from "../../../components/Cast";
import Reviews from "../../../components/Reviews";
import MoviesList from "../../../components/MoviesList";

import axios from "axios";
import { key, endpoint } from "../../../lib/api_lib";

export const dynamic = "force-dynamic";

const getData = async (id: number) => {
	const movie = await axios({
		method: "get",
		url: `${endpoint}tv/${id}?${key}`,
	}).then((response) => {
		return response.data;
	});

	const movieCredits = await axios({
		method: "get",
		url: `${endpoint}tv/${id}/credits?${key}`,
	}).then((response) => {
		return response.data;
	});

	const movieRecommendations = await axios({
		method: "get",
		url: `${endpoint}tv/${id}/recommendations?${key}`,
	}).then((response) => {
		return response.data;
	});

	const movieExternalIds = await axios({
		method: "get",
		url: `${endpoint}tv/${id}/external_ids?${key}`,
	}).then((response) => {
		return response.data;
	});

	const movieReviews = await axios({
		method: "get",
		url: `${endpoint}tv/${id}/reviews?${key}`,
	}).then((response) => {
		return response.data;
	});

	const movieWatchProviders = await axios({
		method: "get",
		url: `${endpoint}tv/${id}/watch/providers?${key}`,
	}).then((response) => {
		return response.data;
	});

	const providers = await axios({
		method: "get",
		url: `${endpoint}watch/providers/regions?${key}`,
	}).then((response) => {
		return response.data.results;
	});

	return {
		movie,
		movieCredits,
		movieRecommendations,
		movieExternalIds,
		movieReviews,
		movieWatchProviders,
		providers,
	};
};

const Tv = async ({ params }: { params: { id: number } }) => {
	const { movie, movieCredits, movieExternalIds, movieRecommendations, movieReviews } = await getData(params.id);

	return (
		<>
			<Head>
				{/* Other Meta */}
				<title>{`${movie.name} | Movies | MovieDB`}</title>
				<meta
					name="keywords"
					content={`${movie.name}, Movies, TV Shows, Popular Movies, Movie, Tv Show, Series, MovieDB, Ahmet, Kilinc, Ahmet Kilinc, AhmetK`}
				/>
				<meta name="description" content={movie.overview} />

				{/* OG Tags */}
				<meta property="og:url" content="https://movies.ahmetk.dev" />
				<meta property="og:title" content={`${movie.name} | MovieDB`} />
				<meta property="og:description" content={movie.overview} />
				<meta property="og:image" content={`https://image.tmdb.org/t/p/w342${movie.poster_path}`} />
				<meta property="og:type" content="article" />

				{/* Twitter Tags */}
				<meta property="twitter:url" content="https://movies.ahmetk.dev" />
				<meta property="twitter:card" content="summary_large_image" />
				<meta property="twitter:title" content={`${movie.name} | MovieDB`} />
				<meta property="twitter:description" content={movie.overview} />
				<meta property="twitter:image" content={`https://image.tmdb.org/t/p/w342${movie.poster_path}`} />
			</Head>
			{movie !== null && <Hero movie={movie} externalIds={movieExternalIds} type="movie" />}
			{movieCredits !== null && <Cast credits={movieCredits} />}
			{movieReviews !== null && <Reviews reviews={movieReviews} />}
			{movieRecommendations !== null && (
				<MoviesList listTitle="Similar Movies" movies={movieRecommendations.results} type="tv" compact={true} />
			)}
		</>
	);
};

export default Tv;
