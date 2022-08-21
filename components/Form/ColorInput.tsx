import invert from "invert-color";

type Props = {
	name?: string;
	id: string;
	value: string;
	onChange: (c: string) => void;
};

export default function ColorInput({ name, id, value, onChange }: Props) {
	return (
		<div className="relative w-full">
			<span
				className="absolute top-5 left-4 pointer-events-none"
				style={{ color: invert(value, true) }}
			>
				{value}
			</span>
			<input
				type="color"
				name={name ? name : id}
				id={id}
				value={value}
				onChange={(e) => onChange(e.target.value)}
				className="w-full h-14 mt-1 rounded-lg border-2 border-gray-200 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-colors"
			/>
		</div>
	);
}
