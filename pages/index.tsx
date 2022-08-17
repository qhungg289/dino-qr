/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import Head from "next/head";
import { useState, useRef } from "react";
import QRCode from "qrcode";
import { saveAs } from "file-saver";

const Home: NextPage = () => {
	const [qrData, setQrData] = useState("");
	const [qrCodeWidth, setQrCodeWidth] = useState(500);
	const [qrCodeUrl, setQrCodeUrl] = useState("");

	const qrCodeImg = useRef<HTMLImageElement>(null);

	return (
		<div>
			<Head>
				<title>Dino QR</title>
			</Head>

			<div>
				<div className="h-52 flex flex-col items-center justify-center gap-6">
					<h1 className="text-6xl font-bold">Dino QR</h1>
					<p className="text-gray-500 text-sm">
						Free & Open source QR Code generator
					</p>
				</div>

				<form
					onSubmit={(e) => {
						e.preventDefault();

						QRCode.toDataURL(qrData, {
							type: "image/jpeg",
							width: qrCodeWidth,
						})
							.then((url) => setQrCodeUrl(url))
							.catch((e) => console.error(e));
					}}
					className="flex flex-col gap-4"
				>
					<div className="relative">
						<label
							className="block text-xs font-medium text-gray-500"
							htmlFor="input"
						>
							Your Input
						</label>

						<input
							type="text"
							name="input"
							id="input"
							required
							placeholder="Put whatever you want in here..."
							value={qrData}
							onChange={(e) => setQrData(e.target.value)}
							className="w-full p-3 mt-1 text-sm border-2 border-gray-200 rounded"
						/>
					</div>

					<div className="relative">
						<label
							className="block text-xs font-medium text-gray-500"
							htmlFor="width"
						>
							Size
						</label>

						<select
							name="width"
							id="width"
							value={qrCodeWidth}
							onChange={(e) => setQrCodeWidth(Number(e.target.value))}
							className="w-full p-3 mt-1 text-sm border-2 border-gray-200 rounded"
						>
							<option value={300}>300 x 300</option>
							<option value={500}>500 x 500</option>
							<option value={1000}>1000 x 1000</option>
							<option value={2000}>2000 x 2000</option>
						</select>
					</div>

					<input
						type="submit"
						value="Create"
						className="px-5 py-3 text-sm font-medium text-white bg-blue-500 rounded-lg cursor-pointer hover:bg-blue-600"
					/>
				</form>
			</div>

			{qrCodeUrl && (
				<div className="my-8 flex flex-col gap-4">
					<img
						src={qrCodeUrl}
						ref={qrCodeImg}
						alt="Your QR Code"
						className="rounded shadow-xl max-w-sm mx-auto"
					/>
					<button
						onClick={() => saveAs(qrCodeImg.current?.src as string, "qr.jpeg")}
						className="px-5 py-3 text-sm font-medium text-white bg-blue-500 rounded-lg cursor-pointer hover:bg-blue-600"
					>
						Download
					</button>
				</div>
			)}
		</div>
	);
};

export default Home;
