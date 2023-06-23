import type { MovieListProps } from "../models/props";
import MovieCard from "./MovieCard";

const MoviesList = (props: MovieListProps) => {
	const { movies, listTitle, type, compact } = props;
	return (
		<article>
			<div className={`${!compact ? `my-2 md:my-4` : ""}`}>
				{listTitle !== null && <h1 className="text-white text-bold text-2xl mb-3">{listTitle}</h1>}
				<div className="flex overflow-x-scroll overflow-y-visible gap-4">
					{movies.map((movie) => (
						<MovieCard key={movie.id} movie={movie} type={type} />
					))}
				</div>
			</div>
		</article>
	);
};

export default MoviesList;
