/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import { useState, useRef } from "react";
import QRCode from "qrcode";
import { saveAs } from "file-saver";

import Hero from "../components/Hero/Hero";
import Label from "../components/Form/Label";
import TextInput from "../components/Form/TextInput";
import SelectInput from "../components/Form/SelectInput";
import FilledButton from "../components/Button/FilledButton";

function Home() {
	const [qrCodeData, setQrCodeData] = useState("");
	const [qrCodeWidth, setQrCodeWidth] = useState(500);
	const [qrCodeUrl, setQrCodeUrl] = useState("");

	const qrCodeImg = useRef<HTMLImageElement>(null);

	return (
		<>
			<Head>
				<title>Dino QR</title>
			</Head>

			<div>
				<Hero />

				<form
					onSubmit={(e) => {
						e.preventDefault();

						QRCode.toDataURL(qrCodeData, {
							type: "image/jpeg",
							width: qrCodeWidth,
						})
							.then((url) => setQrCodeUrl(url))
							.catch((e) => console.error(e));
					}}
					className="flex flex-col gap-4"
				>
					<div className="relative">
						<Label htmlFor="input">Your Input</Label>

						<TextInput
							name="input"
							required
							placeholder="Put whatever you want in here..."
							value={qrCodeData}
							onChange={(e) => setQrCodeData(e.target.value)}
						/>
					</div>

					<div className="relative">
						<Label htmlFor="width">Size</Label>

						<SelectInput
							name="width"
							value={qrCodeWidth}
							onChange={(e) => setQrCodeWidth(Number(e.target.value))}
							options={[
								{ label: "300 x 300", value: 300 },
								{ label: "500 x 500", value: 500 },
								{ label: "1000 x 1000", value: 1000 },
								{ label: "2000 x 2000", value: 2000 },
							]}
						/>
					</div>

					<FilledButton type="submit">Create</FilledButton>
				</form>
			</div>

			{qrCodeUrl && (
				<div className="my-8 flex flex-col gap-4">
					<img
						src={qrCodeUrl}
						ref={qrCodeImg}
						alt="Your QR Code"
						className="rounded shadow-xl max-w-xs mx-auto hover:shadow-2xl focus:shadow-2xl transition-shadow"
					/>

					<FilledButton
						onClick={() => saveAs(qrCodeImg.current?.src as string, "qr.jpeg")}
					>
						Download
					</FilledButton>
				</div>
			)}
		</>
	);
}

export default Home;
