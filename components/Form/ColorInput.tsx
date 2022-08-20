import { TwitterPicker } from "react-color";
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
				className="w-full p-3 mt-1 border-2 border-gray-200 focus:border-gray-200 focus:outline-none focus:ring-1 focus:ring-gray-200 rounded transition-colors cursor-pointer"
			/>

			<AnimatePresence>
				{isPickerOpen && (
					<motion.div
						className="absolute top-16 z-10"
						ref={picker}
						initial={{ opacity: 0, y: -50 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0 }}
					>
						<TwitterPicker
							color={value}
							colors={[
								"#000000",
								"#991b1b",
								"#115e59",
								"#065f46",
								"#075985",
								"#1e40af",
								"#3730a3",
								"#5b21b6",
								"#9d174d",
								"#9f1239",
							]}
							onChangeComplete={(color, _) => onChange(color.hex)}
						/>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
