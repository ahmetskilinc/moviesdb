import Cast from "../../../components/Cast";
import Hero from "../../../components/Hero";
import MoviesList from "../../../components/MoviesList";
import Reviews from "../../../components/Reviews";

export const dynamic = "force-dynamic";

export default async function Page({ params }: { params: { id: number } }) {
	const movieRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tv_shows/${params.id}`);
	const { tv, tvCredits, tvRecommendations, tvExternalIds, tvReviews } = await movieRes.json();

	const providersRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/watch_providers`);
	const providers = await providersRes.json();

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
			{tv !== null ? <Hero movie={tv} externalIds={tvExternalIds} type="tv" /> : null}
			{tvCredits !== null ? <Cast credits={tvCredits} /> : null}
			{tvReviews !== null ? <Reviews reviews={tvReviews} /> : null}
			{tvRecommendations !== null ? (
				<MoviesList listTitle="Similar Movies" movies={tvRecommendations.results} type="tv" compact={true} />
			) : null}
		</>
	);
}

export const generateMetadata = async ({ params }: { params: { id: number } }) => {
	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tv_shows/${params.id}`);
	const { tv } = await res.json();

	return {
		title: tv.title || tv.name,
	};
};
