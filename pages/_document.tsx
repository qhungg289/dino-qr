import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				<link
					href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;700&display=swap"
					rel="stylesheet"
				/>
				<meta name="description" content="Simple QR code generator" />
				<meta
					name="description"
					content="Author: Hung Duong Quang @qhungg289"
				/>
			</Head>
			<body className="container max-w-lg font-nunito">
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
