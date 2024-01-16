"use client";

import Link from "next/link";
import React, { useRef, useState } from "react";
import Container from "./container";

type Props = {
	children: React.ReactNode;
};

const NavbarItems = () => {
	return (
		<>
			<li>
				<Link href="/movies/popular">Popular movies</Link>
			</li>
			<li>
				<Link href="/movies/trending">Trending movies</Link>
			</li>
			<li>
				<Link href="/tv/popular">Popular TV shows</Link>
			</li>
			<li>
				<Link href="/tv/trending">Trending TV shows</Link>
			</li>
		</>
	);
};

const Drawer = (props: Props) => {
	const drawerRef = useRef<HTMLInputElement | null>(null);

	return (
		<div className="drawer">
			<input id="drawer" type="checkbox" className="drawer-toggle" ref={drawerRef} />
			<div className="drawer-content flex flex-col">
				{/* Navbar */}
				<div className="w-full fixed z-50 top-0 bg-primary text-primary-content">
					<div className="mx-auto max-w-cs navbar px-2 lg:px-0">
						<div className="flex-none lg:hidden">
							<label htmlFor="drawer" aria-label="open sidebar" className="btn btn-square btn-ghost">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-5 w-5"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
								</svg>
							</label>
						</div>
						<div className="flex-1 px-0 mx-0">
							<Link href="/" className="btn btn-ghost text-xl">
								MoviesDB
							</Link>
						</div>
						<div className="flex-none hidden lg:block">
							<ul className="menu menu-horizontal">
								<NavbarItems />
							</ul>
						</div>
					</div>
				</div>
				<Container>{props.children}</Container>
			</div>
			<div className="drawer-side z-30 mt-16">
				<label htmlFor="drawer" aria-label="close sidebar" className="drawer-overlay"></label>
				<ul className="menu p-4 w-80 min-h-full bg-base-200">
					<NavbarItems />
				</ul>
			</div>
		</div>
	);
};

export default Drawer;
