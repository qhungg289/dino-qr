import { ReactNode } from "react";

type Props = {
	children: ReactNode;
	htmlFor: string;
};

export default function Label({ children, htmlFor }: Props) {
	return (
		<label
			className="block text-sm font-medium text-gray-500"
			htmlFor={htmlFor}
		>
			{children}
		</label>
	);
}
