/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import { useState, useRef } from "react";
import QRCode from "qrcode";
import { saveAs } from "file-saver";
import { motion, AnimatePresence } from "framer-motion";

import Hero from "../components/Hero/Hero";
import Label from "../components/Form/Label";
import TextInput from "../components/Form/TextInput";
import SelectInput from "../components/Form/SelectInput";
import ColorInput from "../components/Form/ColorInput";
import FilledButton from "../components/Button/FilledButton";
import Notification from "../components/Feedback/Notification";

function Home() {
	const [qrCodeData, setQrCodeData] = useState("");
	const [qrCodeWidth, setQrCodeWidth] = useState(500);
	const [qrCodeColorDark, setQrCodeColorDark] = useState("#000000");
	const [qrCodeColorLight, setQrCodeColorLight] = useState("#ffffff");
	const [qrCodeUrl, setQrCodeUrl] = useState("");

	const [isSuccessNotiOpen, setIsSuccessNotiOpen] = useState(false);
	const [isErrorNotiOpen, setIsErrorNotiOpen] = useState(false);

	const qrCodeImg = useRef<HTMLImageElement>(null);

	return (
		<div className="divide-y-2">
			<Head>
				<title>Dino QR</title>
			</Head>

			{isSuccessNotiOpen && (
				<Notification
					title="Success"
					content="Your QR code was generated successfully"
					type="success"
					closeAction={() => setIsSuccessNotiOpen(false)}
				/>
			)}

			{isErrorNotiOpen && (
				<Notification
					title="Error"
					content="Something went wrong"
					type="error"
					closeAction={() => setIsErrorNotiOpen(false)}
				/>
			)}

			<div className="py-8">
				<Hero />

				<motion.form
					onSubmit={(e) => {
						e.preventDefault();

						QRCode.toDataURL(qrCodeData, {
							type: "image/jpeg",
							width: qrCodeWidth,
							color: {
								dark: qrCodeColorDark,
								light: qrCodeColorLight,
							},
						})
							.then((url) => {
								setQrCodeUrl(url);
								setIsSuccessNotiOpen(true);
							})
							.catch((e) => {
								setIsErrorNotiOpen(true);
								console.error(e);
							});
					}}
					className="flex flex-col gap-4"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
				>
					<div className="relative">
						<Label htmlFor="input">Your Input</Label>

						<TextInput
							id="input"
							required
							placeholder="Put whatever you want in here..."
							value={qrCodeData}
							onChange={(e) => setQrCodeData(e.target.value)}
						/>
					</div>

					<div className="relative">
						<Label htmlFor="width">Size</Label>

						<SelectInput
							id="width"
							value={qrCodeWidth}
							onChange={(e) => setQrCodeWidth(Number(e.target.value))}
							options={[
								{ label: "250 x 250", value: 250 },
								{ label: "500 x 500", value: 500 },
								{ label: "1000 x 1000", value: 1000 },
								{ label: "2000 x 2000", value: 2000 },
							]}
						/>
					</div>

					<div className="relative">
						<div className="flex justify-between">
							<Label htmlFor="color">Color</Label>

							{qrCodeColorDark !== "#000000" ||
							qrCodeColorLight !== "#ffffff" ? (
								<button
									onClick={(e) => {
										e.preventDefault();
										setQrCodeColorDark("#000000");
										setQrCodeColorLight("#ffffff");
									}}
									className="text-emerald-600 font-bold"
								>
									Reset
								</button>
							) : null}
						</div>

						<div className="flex gap-2 justify-between">
							<ColorInput
								id="color"
								value={qrCodeColorDark}
								onChange={(c) => setQrCodeColorDark(c)}
							/>

							<ColorInput
								id="color"
								value={qrCodeColorLight}
								onChange={(c) => setQrCodeColorLight(c)}
							/>
						</div>
					</div>

					<FilledButton type="submit">Generate</FilledButton>
				</motion.form>
			</div>

			<AnimatePresence>
				{qrCodeUrl && (
					<motion.div
						className="py-8 flex flex-col gap-4"
						initial={{ y: 200 }}
						animate={{ y: 0 }}
						exit={{ opacity: 0 }}
					>
						<img
							src={qrCodeUrl}
							ref={qrCodeImg}
							alt="Your QR Code"
							className="rounded-lg shadow-xl max-w-[15rem] sm:max-w-xs mx-auto hover:shadow-2xl focus:shadow-2xl transition-shadow"
						/>

						<div className="grid grid-cols-4 gap-2">
							<FilledButton
								onClick={() =>
									saveAs(qrCodeImg.current?.src as string, "qr.jpeg")
								}
								className="col-span-3"
							>
								Download
							</FilledButton>

							<button
								onClick={() => {
									setQrCodeData("");
									setQrCodeUrl("");
									setIsSuccessNotiOpen(false);
								}}
								className="font-medium px-5 py-3 border flex items-center justify-center rounded-lg bg-rose-100 hover:bg-rose-500 text-rose-500 hover:text-white transition-colors"
							>
								Delete
							</button>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}

export default Home;
