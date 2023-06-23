import Link from "next/link";
import type { MovieCardProps } from "../models/props";

const MovieCard = (props: MovieCardProps) => {
	const { movie, type } = props;
	const { poster_path, id } = movie;

	return (
		<Link
			href={`${type === "tv" ? "/tv" : "/movies"}/[id]`}
			as={`${type === "tv" ? "/tv" : "/movies"}/${id}`}
			className="flex-shrink-0 shadow-md rounded-xl relative"
		>
			<img
				loading="lazy"
				src={poster_path ? `https://image.tmdb.org/t/p/w185${poster_path}` : "/images/placeholder.jpeg"}
				alt={type === "tv" ? movie.name : movie.title}
				className="w-24 lg:w-48 h-36 lg:h-72 object-cover rounded-xl shadow-2xl"
			/>
		</Link>
	);
};

export default MovieCard;
