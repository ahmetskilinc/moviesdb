"use client";

import Link from "next/link";
import type { HomeHeroProps } from "../models/props";
import { useEffect } from "react";

const HomeHero = (props: HomeHeroProps) => {
	const { movies } = props;

	useEffect(() => {
		const init = async () => {
			const { Carousel, initTE } = await import("tw-elements");
			const myCarousel = new Carousel(document.getElementById("HomeHeroCarousel"));
		};
		init();
	}, []);

	return (
		<div id="HomeHeroCarousel" className="relative" data-te-carousel-init data-te-carousel-slide>
			<div className="relative w-full overflow-hidden after:clear-both after:block after:content-[''] lg:mt-0">
				<div
					className="absolute bottom-0 left-0 right-0 mx-[15%] mb-4 flex list-none justify-center p-0 z-20"
					data-te-carousel-indicators
				>
					{movies.map((movie, index) => (
						<button
							key={movie.id}
							type="button"
							data-te-target="#HomeHeroCarousel"
							data-te-slide-to={index}
							data-te-carousel-active
							className="mx-[3px] box-content h-[3px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-white bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none"
							aria-current="true"
							aria-label={movie.name || movie.title}
						></button>
					))}
				</div>

				{movies.map((movie, index) => (
					<div
						key={index}
						className={`relative float-left ${
							index !== 0 ? "hidden" : ""
						} -mr-[100%] w-full transition-transform duration-[200ms] ease-in-out motion-reduce:transition-none after:bg-neutral-500 after:w-full after:h-full after:bg-opacity-40 after:absolute after:top-0 after:left-0 after:right-0 after:bottom-0 after:z-[1] bg-cover bg-center`}
						style={{
							backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})`,
						}}
						data-te-carousel-item
						{...(index === 0 ? { "data-te-carousel-active": "true" } : {})}
					>
						<div className="max-w-5xl flex flex-col lg:flex-row justify-center items-center mx-auto relative z-10 p-4 md:py-14">
							<img
								loading="lazy"
								src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
								alt={movie.title || movie.name}
								className="w-44 lg:w-72 h-64 lg:h-96 object-cover rounded-xl shadow-2xl lg:mr-6 mb-2 lg:mb-0"
							/>
							<div>
								<h1 className="text-xl lg:text-5xl font-bold text-white mb-3">{movie.title || movie.name}</h1>
								<p className="text-white line-clamp-2 md:line-clamp-3">{movie.overview}</p>
								<Link href={`${movie.type === "tv" ? "/tv" : "/movies"}/${movie.id}`} className="btn mt-2">
									Show me
								</Link>
							</div>
						</div>
					</div>
				))}
			</div>
			<div className="rela">
				<button
					className="hidden absolute bottom-0 left-0 top-0 z-[1] sm:flex w-[10%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
					type="button"
					data-te-target="#HomeHeroCarousel"
					data-te-slide="prev"
				>
					<span className="inline-block h-8 w-8">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth="1.5"
							stroke="currentColor"
							className="h-6 w-6"
						>
							<path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
						</svg>
					</span>
					<span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
						Previous
					</span>
				</button>
				<button
					className="hidden absolute bottom-0 right-0 top-0 z-[1] sm:flex w-[10%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
					type="button"
					data-te-target="#HomeHeroCarousel"
					data-te-slide="next"
				>
					<span className="inline-block h-8 w-8">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth="1.5"
							stroke="currentColor"
							className="h-6 w-6"
						>
							<path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
						</svg>
					</span>
					<span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
						Next
					</span>
				</button>
			</div>
		</div>
	);
};

export default HomeHero;
