import { key, endpoint } from "../../../lib/api_lib";
import MoviesList from "../../../components/MoviesList";
import Container from "@/components/container";
import { getList } from "@/_api/getList";
import React from "react";

export const dynamic = "force-dynamic";

const getData = async () => {
	const popularMovies1 = (await getList(`${endpoint}tv/popular?${key}&language=en-US&page=1`)).results;
	const popularMovies2 = (await getList(`${endpoint}tv/popular?${key}&language=en-US&page=2`)).results;
	const popularMovies3 = (await getList(`${endpoint}tv/popular?${key}&language=en-US&page=3`)).results;
	const popularMovies4 = (await getList(`${endpoint}tv/popular?${key}&language=en-US&page=4`)).results;

	return [popularMovies1, popularMovies2, popularMovies3, popularMovies4];
};

const MoviePopular = async () => {
	const data = await getData();
	return (
		<Container>
			{data.map((list, index) => {
				return (
					<React.Fragment key={index}>
						<MoviesList
							movies={list}
							listTitle={index === 0 ? "Popular TV shows this week" : undefined}
							type="movie"
							compact={false}
						/>
						{index !== list.length - 1 ? <div className="divider"></div> : null}
					</React.Fragment>
				);
			})}
		</Container>
	);
};

export default MoviePopular;
