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

function Home() {
	const [qrCodeData, setQrCodeData] = useState("");
	const [qrCodeWidth, setQrCodeWidth] = useState(500);
	const [qrCodeColorDark, setQrCodeColorDark] = useState("#000000");
	const [qrCodeColorLight, setQrCodeColorLight] = useState("#FFFFFF");
	const [qrCodeUrl, setQrCodeUrl] = useState("");

	const qrCodeImg = useRef<HTMLImageElement>(null);

	return (
		<div className="divide-y-2">
			<Head>
				<title>Dino QR</title>
			</Head>

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
							.then((url) => setQrCodeUrl(url))
							.catch((e) => console.error(e));
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
								{ label: "300 x 300", value: 300 },
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
							qrCodeColorLight !== "#FFFFFF" ? (
								<button
									onClick={(e) => {
										e.preventDefault();
										setQrCodeColorDark("#000000");
										setQrCodeColorLight("#FFFFFF");
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

					<FilledButton type="submit">Create</FilledButton>
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
								}}
								className="px-5 py-3 border flex items-center justify-center rounded-lg bg-rose-100 hover:bg-rose-500 group transition-colors"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 448 512"
									className="fill-rose-500 w-5 group-hover:fill-white transition-colors"
								>
									<path d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM31.1 128H416V448C416 483.3 387.3 512 352 512H95.1C60.65 512 31.1 483.3 31.1 448V128zM111.1 208V432C111.1 440.8 119.2 448 127.1 448C136.8 448 143.1 440.8 143.1 432V208C143.1 199.2 136.8 192 127.1 192C119.2 192 111.1 199.2 111.1 208zM207.1 208V432C207.1 440.8 215.2 448 223.1 448C232.8 448 240 440.8 240 432V208C240 199.2 232.8 192 223.1 192C215.2 192 207.1 199.2 207.1 208zM304 208V432C304 440.8 311.2 448 320 448C328.8 448 336 440.8 336 432V208C336 199.2 328.8 192 320 192C311.2 192 304 199.2 304 208z" />
								</svg>
							</button>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}

export default Home;
