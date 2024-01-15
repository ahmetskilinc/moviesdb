import Link from "next/link";

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

const Header = () => {
	return (
		<div className="w-full fixed z-50 top-0 bg-primary text-primary-content">
			<div className="navbar">
				<div className="navbar-start">
					<div className="dropdown">
						<div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-5 w-5"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
							</svg>
						</div>
						<ul
							tabIndex={0}
							className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-primary text-primary-content rounded-box w-52"
						>
							<NavbarItems />
						</ul>
					</div>
					<Link href="/" className="btn btn-ghost text-xl">
						MoviesDB
					</Link>
				</div>
				<div className="navbar-end hidden lg:flex">
					<ul className="menu menu-horizontal px-1">
						<NavbarItems />
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Header;
