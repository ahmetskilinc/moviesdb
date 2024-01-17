import { default as dynamicComponentLoader } from "next/dynamic";
import LoadingSpinner from "../components/LoadingSpinner";
import MoviesList from "../components/MoviesList";

const HomeHero = dynamicComponentLoader(() => import("../components/HomeHero"), {
	ssr: false,
});

export const dynamic = "force-dynamic";

export default async function Page() {
	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/home`);
	const data = await res.json();

	return data.homeHero !== null && data.moviesPopular !== null && data.tvPopular !== null ? (
		<>
			<HomeHero movies={data.homeHero} />
			<MoviesList movies={data.moviesPopular} listTitle="Popular movies this week" type="movie" compact={false} />
			<div className="divider"></div>
			<MoviesList movies={data.tvPopular} listTitle="Popular TV shows this week" type="tv" compact={false} />
		</>
	) : (
		<LoadingSpinner />
	);
}

export const metadata = {
	title: "MoviesDB",
};
