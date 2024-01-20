import Link from "next/link";
import type { CastProps } from "../models/props";

const Cast = (props: CastProps) => {
	const { credits } = props;

	return (
		<article className="w-full">
			<div>
				<h1 className="text-white text-bold text-2xl my-3">Cast</h1>
				<div className="flex overflow-x-scroll overflow-y-visible gap-4">
					{credits !== undefined &&
						credits.cast.map((cast, index) => (
							<Link href={`/person/${cast.id}`} key={index} className="w-24 lg:w-36 flex-shrink-0">
								<img
									loading="lazy"
									src={
										cast.profile_path
											? `https://image.tmdb.org/t/p/w185${cast.profile_path}`
											: "/images/placeholder.jpeg"
									}
									alt={cast.name}
									className="w-24 lg:w-36 h-36 lg:h-52 object-cover rounded-xl shadow-2xl lg:mr-6"
								/>
								<div className="text-xs lg:text-sm pt-1 space-y-1">
									<h1 className="font-bold text-white">{cast.name}</h1>
									<p className="text-gray-300">{cast.character}</p>
								</div>
							</Link>
						))}
				</div>
			</div>
			<div>
				<h1 className="text-white text-bold text-2xl my-3">Cast</h1>
				<div className="flex overflow-x-scroll overflow-y-visible gap-4">
					{credits !== undefined &&
						credits.crew.map((cast, index) => (
							<Link href={`/person/${cast.id}`} key={index} className="w-24 lg:w-36 flex-shrink-0">
								<img
									loading="lazy"
									src={
										cast.profile_path
											? `https://image.tmdb.org/t/p/w185${cast.profile_path}`
											: "/images/placeholder.jpeg"
									}
									alt={cast.name}
									className="w-24 lg:w-36 h-36 lg:h-52 object-cover rounded-xl shadow-2xl lg:mr-6"
								/>
								<div className="text-xs lg:text-sm pt-1 space-y-1">
									<h1 className="font-bold text-white">{cast.name}</h1>
									<p className="text-gray-300">{cast.job}</p>
								</div>
							</Link>
						))}
				</div>
			</div>
		</article>
	);
};

export default Cast;
