import { key, endpoint } from "../../../lib/api_lib";
import MoviesList from "../../../components/MoviesList";
import Container from "@/components/container";
import { getList } from "@/_api/getList";

export const dynamic = "force-dynamic";

const getData = async () => {
	const trendingMovies1 = (await getList(`${endpoint}movie/top-rated?${key}&language=en-US&page=1`)).results;
	const trendingMovies2 = (await getList(`${endpoint}movie/top-rated?${key}&language=en-US&page=2`)).results;
	const trendingMovies3 = (await getList(`${endpoint}movie/top-rated?${key}&language=en-US&page=3`)).results;
	const trendingMovies4 = (await getList(`${endpoint}movie/top-rated?${key}&language=en-US&page=4`)).results;

	return [trendingMovies1, trendingMovies2, trendingMovies3, trendingMovies4];
};

const Page = async () => {
	const data = await getData();
	return (
		<Container>
			{data.map((list, index) => {
				return (
					<>
						<MoviesList
							movies={list}
							listTitle={index === 0 ? "Popular TV shows this week" : undefined}
							type="movie"
							compact={false}
						/>
						{index !== list.length - 1 ? <div className="divider"></div> : null}
					</>
				);
			})}
		</Container>
	);
};

export default Page;
