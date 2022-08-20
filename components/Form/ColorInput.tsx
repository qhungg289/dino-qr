import { SliderPicker } from "react-color";
import invert from "invert-color";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Props = {
	name?: string;
	id: string;
	value: string;
	onChange: (c: string) => void;
};

export default function ColorInput({ name, id, value, onChange }: Props) {
	const [isPickerOpen, setIsPickerOpen] = useState(false);

	const picker = useRef<HTMLDivElement>(null);

	useEffect(() => {
		document.addEventListener("mousedown", (e) => {
			if (
				picker.current &&
				isPickerOpen &&
				!picker.current.contains(e.target as Node)
			) {
				setIsPickerOpen(false);
			}
		});
	}, [isPickerOpen]);

	return (
		<div className="relative">
			<input
				type="text"
				readOnly
				name={name ? name : id}
				id={id}
				style={{ backgroundColor: value, color: invert(value, true) }}
				value={value}
				onFocus={() => setIsPickerOpen(true)}
				onClick={() => setIsPickerOpen(true)}
				className="w-full p-3 mt-1 border-2 border-gray-200 focus:border-gray-200 focus:outline-none focus:ring-1 focus:ring-gray-200 rounded-lg transition-colors cursor-pointer"
			/>

			<AnimatePresence>
				{isPickerOpen && (
					<motion.div
						className="absolute flex flex-col gap-4 top-16 z-10 w-full border shadow-lg rounded p-4 bg-white"
						ref={picker}
						initial={{ opacity: 0, y: -50 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0 }}
					>
						<SliderPicker
							color={value}
							onChange={(color, _) => onChange(color.hex)}
						/>

						<button
							className="text-emerald-600 font-bold px-5 py-3 rounded-lg hover:bg-emerald-100 transition-colors"
							onClick={(e) => {
								e.preventDefault();
								setIsPickerOpen(false);
							}}
						>
							Done
						</button>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
