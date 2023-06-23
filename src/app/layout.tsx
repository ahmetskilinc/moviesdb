import Container from "@/components/container";
import Header from "@/components/header";
import "./globals.css";
import Footer from "@/components/Footer";

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head />
			<body>
				<Header />
				<Container>{children}</Container>
				<Footer />
			</body>
		</html>
	);
}
