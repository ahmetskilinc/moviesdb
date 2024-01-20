import Cast from "@/components/Cast";
import Hero from "../../../components/Hero";
import MoviesList from "../../../components/MoviesList";
import Reviews from "../../../components/Reviews";
import WatchProviders from "../../../components/WatchProviders";

export const dynamic = "force-dynamic";

export default async function Page({ params }: { params: { id: number } }) {
	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/movies/${params.id}`);
	const data = await res.json();

	const providersRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/watch_providers`);
	const providers = await providersRes.json();

	return (
		<>
			{data !== null && <Hero movie={data} externalIds={data.external_ids} type="movie" />}
			{data.credits !== null && <Cast credits={data.credits} />}
			{/* {movieWatchProviders !== null && <WatchProviders movieWatchProviders={movieWatchProviders} providers={providers} />} */}
			{data.reviews !== null && <Reviews reviews={data.reviews} />}
			{/* {movie !== null ? movie.revenue ? <RevenueBudgetView budget={movie.budget} revenue={movie.revenue} /> : null : null} */}
			{data.recommendations !== null && (
				<MoviesList listTitle="Similar Movies" movies={data.recommendations.results} type="movie" compact={true} />
			)}
		</>
	);
}

export const generateMetadata = async ({ params }: { params: { id: number } }) => {
	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/movies/${params.id}`);
	const data = await res.json();

	return {
		title: data.title,
	};
};
