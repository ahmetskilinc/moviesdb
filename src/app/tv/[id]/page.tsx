import Cast from "../../../components/Cast";
import Hero from "../../../components/Hero";
import MoviesList from "../../../components/MoviesList";
import Reviews from "../../../components/Reviews";
import { getList } from "@/_api/getList";

export const dynamic = "force-dynamic";

const getData = async (id: number) => {
	const movie = await getList(`tv/${id}?`);
	const movieCredits = await getList(`tv/${id}/credits?`);
	const movieRecommendations = await getList(`tv/${id}/recommendations?`);
	const movieExternalIds = await getList(`tv/${id}/external_ids?`);
	const movieReviews = await getList(`tv/${id}/reviews?`);
	const movieWatchProviders = await getList(`tv/${id}/watch/providers?`);
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
	const { movie, movieCredits, movieExternalIds, movieRecommendations, movieReviews } = await getData(params.id);

	return (
		<>
			{/* <Head>
				<title>{`${movie.name} | Movies | MovieDB`}</title>
				<meta
					name="keywords"
					content={`${movie.name}, Movies, TV Shows, Popular Movies, Movie, Tv Show, Series, MovieDB, Ahmet, Kilinc, Ahmet Kilinc, AhmetK`}
				/>
				<meta name="description" content={movie.overview} />

				<meta property="og:url" content="https://movies.ahmetk.dev" />
				<meta property="og:title" content={`${movie.name} | MovieDB`} />
				<meta property="og:description" content={movie.overview} />
				<meta property="og:image" content={`https://image.tmdb.org/t/p/w342${movie.poster_path}`} />
				<meta property="og:type" content="article" />

				<meta property="twitter:url" content="https://movies.ahmetk.dev" />
				<meta property="twitter:card" content="summary_large_image" />
				<meta property="twitter:title" content={`${movie.name} | MovieDB`} />
				<meta property="twitter:description" content={movie.overview} />
				<meta property="twitter:image" content={`https://image.tmdb.org/t/p/w342${movie.poster_path}`} />
			</Head> */}
			{movie !== null ? <Hero movie={movie} externalIds={movieExternalIds} type="tv" /> : null}
			{movieCredits !== null ? <Cast credits={movieCredits} /> : null}
			{movieReviews !== null ? <Reviews reviews={movieReviews} /> : null}
			{movieRecommendations !== null ? (
				<MoviesList listTitle="Similar Movies" movies={movieRecommendations.results} type="tv" compact={true} />
			) : null}
		</>
	);
}

export const generateMetadata = async ({ params }: { params: { id: number } }) => {
	const { movie, movieCredits, movieExternalIds, movieRecommendations, movieReviews, movieWatchProviders, providers } = await getData(
		params.id
	);

	return {
		title: movie.title || movie.name,
	};
};
