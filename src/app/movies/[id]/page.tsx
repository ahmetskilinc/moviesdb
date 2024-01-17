import Hero from "../../../components/Hero";
import MoviesList from "../../../components/MoviesList";
import Reviews from "../../../components/Reviews";
import WatchProviders from "../../../components/WatchProviders";

export const dynamic = "force-dynamic";

export default async function Page({ params }: { params: { id: number } }) {
	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/movies/${params.id}`);
	const { movie, movieCredits, movieRecommendations, movieExternalIds, movieReviews, movieWatchProviders } = await res.json();

	const providersRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/watch_providers`);
	const providers = await providersRes.json();

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
	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/movies/${params.id}`);
	const { movie } = await res.json();

	return {
		title: movie.title,
	};
};
