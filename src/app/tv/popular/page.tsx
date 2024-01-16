import { getList } from "@/_api/getList";
import React from "react";
import MoviesList from "../../../components/MoviesList";

export const dynamic = "force-dynamic";

const getData = async () => {
	const popular1 = (await getList(`tv/popular?language=en-US&page=1&`)).results;
	const popular2 = (await getList(`tv/popular?language=en-US&page=2&`)).results;
	const popular3 = (await getList(`tv/popular?language=en-US&page=3&`)).results;
	const popular4 = (await getList(`tv/popular?language=en-US&page=4&`)).results;

	return [popular1, popular2, popular3, popular4];
};

export default async function Page() {
	const data = await getData();
	return data.map((list, index) => (
		<React.Fragment key={index}>
			<MoviesList movies={list} listTitle={index === 0 ? "Popular TV shows this week" : undefined} type="tv" compact={false} />
			{index !== list.length - 1 ? <div className="divider"></div> : null}
		</React.Fragment>
	));
}

export const metadata = {
	title: "Popular TV shows",
};
