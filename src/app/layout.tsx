import Drawer from "@/components/Drawer";
import Footer from "@/components/Footer";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head />
			<body>
				<Drawer>{children}</Drawer>
				<Footer />
			</body>
		</html>
	);
}

export const metadata = {
	title: {
		default: "MoviesDB",
		template: "%s - MoviesDB",
	},
};

export const viewport = {
	themeColor: "#1eb854",
};
