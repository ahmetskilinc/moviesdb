import Cast from "../../../components/Cast";
import Hero from "../../../components/Hero";
import MoviesList from "../../../components/MoviesList";
import RevenueBudgetView from "../../../components/RevBudgetView";
import Reviews from "../../../components/Reviews";
import WatchProviders from "../../../components/WatchProviders";
import { getList } from "@/_api/getList";

export const dynamic = "force-dynamic";

const getData = async (id: number) => {
	const movie = await getList(`movie/${id}?`);
	const movieCredits = await getList(`movie/${id}/credits?`);
	const movieRecommendations = await getList(`movie/${id}/recommendations?`);
	const movieExternalIds = await getList(`movie/${id}/external_ids?`);
	const movieReviews = await getList(`movie/${id}/reviews?`);
	const movieWatchProviders = await getList(`movie/${id}/watch/providers?`);
	const providers = (await getList(`watch/providers/regions?`)).results;

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

export default async function Page({ params }: { params: { id: number } }) {
	const { movie, movieCredits, movieExternalIds, movieRecommendations, movieReviews, movieWatchProviders, providers } = await getData(
		params.id
	);

	return (
		<>
			{/* <Head>
				<title>{`${movie.title} | Movies | MovieDB`}</title>
				<meta
					name="keywords"
					content={`${movie.title}, Movies, TV Shows, Popular Movies, Movie, Tv Show, Series, MovieDB, Ahmet, Kilinc, Ahmet Kilinc, AhmetK`}
				/>
				<meta name="description" content={movie.overview} />

				<meta property="og:url" content="https://movies.ahmetk.dev" />
				<meta property="og:title" content={`${movie.title} | MovieDB`} />
				<meta property="og:description" content={movie.overview} />
				<meta property="og:image" content={`https://image.tmdb.org/t/p/w342${movie.poster_path}`} />
				<meta property="og:type" content="article" />

				<meta property="twitter:url" content="https://movies.ahmetk.dev" />
				<meta property="twitter:card" content="summary_large_image" />
				<meta property="twitter:title" content={`${movie.title} | MovieDB`} />
				<meta property="twitter:description" content={movie.overview} />
				<meta property="twitter:image" content={`https://image.tmdb.org/t/p/w342${movie.poster_path}`} />
			</Head> */}
			{movie !== null && <Hero movie={movie} externalIds={movieExternalIds} type="movie" />}
			{/* {movieCredits !== null && <Cast credits={movieCredits} />} */}
			{movieWatchProviders !== null && <WatchProviders movieWatchProviders={movieWatchProviders} providers={providers} />}
			{movieReviews !== null && <Reviews reviews={movieReviews} />}
			{/* {movie !== null ? movie.revenue ? <RevenueBudgetView budget={movie.budget} revenue={movie.revenue} /> : null : null} */}
			{movieRecommendations !== null && (
				<MoviesList listTitle="Similar Movies" movies={movieRecommendations.results} type="movie" compact={true} />
			)}
		</>
	);
}

export const generateMetadata = async ({ params }: { params: { id: number } }) => {
	const { movie, movieCredits, movieExternalIds, movieRecommendations, movieReviews, movieWatchProviders, providers } = await getData(
		params.id
	);

	return {
		title: movie.title,
	};
};
