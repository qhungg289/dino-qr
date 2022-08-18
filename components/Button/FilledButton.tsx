import { ReactNode } from "react";
import { motion } from "framer-motion";

type Props = {
	type?: "button" | "submit" | "reset" | undefined;
	children: ReactNode;
	onClick?: () => void;
};

export default function FilledButton({ type, children, onClick }: Props) {
	return (
		<motion.button
			type={type}
			onClick={onClick}
			className="px-5 py-3 font-medium text-white bg-blue-500 rounded-lg cursor-pointer"
			whileHover={{
				scale: 1.05,
				opacity: 0.9,
			}}
			whileTap={{
				scale: 0.95,
			}}
		>
			{children}
		</motion.button>
	);
}
