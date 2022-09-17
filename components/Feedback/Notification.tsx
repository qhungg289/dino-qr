import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { useEffect } from "react";

type Props = {
	title?: string;
	content: string;
	type?: "success" | "error";
	closeAction: () => void;
};

export default function Notification({
	title,
	content,
	type,
	closeAction,
}: Props) {
	useEffect(() => {
		const t = setTimeout(closeAction, 3000);

		return () => {
			clearTimeout(t);
		};
	}, []);

	return createPortal(
		<motion.div
			initial={{ x: 100 }}
			animate={{ x: 0 }}
			className="p-4 rounded-lg border bg-white shadow-lg flex items-center justify-between w-3/4 md:w-1/3 fixed right-2 top-2"
		>
			<div className="flex items-center gap-4">
				{type === "success" && (
					<div className="bg-green-500 rounded-full p-2">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							className="w-8 h-8 text-white"
						>
							<path
								fillRule="evenodd"
								d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
								clipRule="evenodd"
							/>
						</svg>
					</div>
				)}

				{type === "error" && (
					<div className="bg-red-500 rounded-full p-2">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							className="w-8 h-8 text-white"
						>
							<path
								fillRule="evenodd"
								d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
								clipRule="evenodd"
							/>
						</svg>
					</div>
				)}

				<div className="space-y-2">
					{title && <p className="font-medium">{title}</p>}
					<p className="text-gray-500">{content}</p>
				</div>
			</div>
			<button onClick={closeAction} className="text-4xl p-4">
				&times;
			</button>
		</motion.div>,
		document.body as Element,
	);
}
