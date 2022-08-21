import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				<link
					href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&display=swap"
					rel="stylesheet"
				></link>
				<meta
					name="description"
					content="Simple QR code generator by @qhungg289"
				/>
			</Head>
			<body className="container max-w-lg font-space-grotesk">
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
