import { motion } from "framer-motion";

export default function Hero() {
	return (
		<motion.div
			className="h-52 flex flex-col items-center justify-center gap-6"
			initial={{ y: -300 }}
			animate={{ y: 0 }}
		>
			<h1 className="text-6xl hover:text-blue-500 font-bold transition-colors">
				Dino QR
			</h1>
			<p className="text-gray-500 text-sm">
				Free & Open source QR code generator
			</p>
		</motion.div>
	);
}
