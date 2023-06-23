import Link from "next/link";

const Header = () => {
	return (
		<div className="navbar fixed bg-base-100 z-50 top-0">
			<div className="navbar-start">
				<div className="dropdown">
					<label tabIndex={0} className="btn btn-ghost btn-circle">
						<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
						</svg>
					</label>
					<ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
						<li>
							<Link href="/">Home</Link>
						</li>
						<li>
							<Link href="/movies/popular">Popular Movies</Link>
						</li>
						<li>
							<Link href="/movies/trending">Trending Movies</Link>
						</li>
						<li>
							<Link href="/tv/popular">PopularTV Shows</Link>
						</li>
						<li>
							<Link href="/tv/trending">Trending TV Shows</Link>
						</li>
					</ul>
				</div>
			</div>
			<div className="navbar-center">
				<Link href="/" className="btn btn-ghost normal-case text-xl">
					MovieDB
				</Link>
			</div>
			<div className="navbar-end">
				<Link href="/search" className="btn btn-ghost btn-circle">
					<p className="h-0 w-0 text-[0px]">Search</p>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-5 w-5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth={2}
					>
						<path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
					</svg>
				</Link>
			</div>
		</div>
	);
};

export default Header;
