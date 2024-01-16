import { getList } from "@/_api/getList";
import MoviesList from "../../../components/MoviesList";
import { endpoint, key } from "../../../lib/api_lib";

export const dynamic = "force-dynamic";

const getData = async () => {
	const trending1 = (await getList(`movie/top-rated?language=en-US&page=1&`)).results;
	const trending2 = (await getList(`movie/top-rated?language=en-US&page=2&`)).results;
	const trending3 = (await getList(`movie/top-rated?language=en-US&page=3&`)).results;
	const trending4 = (await getList(`movie/top-rated?language=en-US&page=4&`)).results;

	return [trending1, trending2, trending3, trending4];
};

export default async function Page() {
	const data = await getData();
	return data.map((list, index) => (
		<>
			<MoviesList movies={list} listTitle={index === 0 ? "Popular TV shows this week" : undefined} type="movie" compact={false} />
			{index !== list.length - 1 ? <div className="divider"></div> : null}
		</>
	));
}

export const metadata = {
	title: "Trending movies",
};
