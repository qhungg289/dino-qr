import { ReactNode } from "react";

type Props = {
	type?: "button" | "submit" | "reset" | undefined;
	children: ReactNode;
	onClick?: () => void;
};

export default function FilledButton({ type, children, onClick }: Props) {
	return (
		<button
			type={type}
			onClick={onClick}
			className="px-5 py-3 font-medium text-white bg-blue-500 rounded-lg cursor-pointer hover:bg-blue-600 transition-colors"
		>
			{children}
		</button>
	);
}
