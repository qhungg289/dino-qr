import { ChangeEvent } from "react";

type Props = {
	name?: string;
	id: string;
	value: number;
	onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
	options: { label: string; value: number }[];
};

export default function SelectInput({
	name,
	id,
	value,
	onChange,
	options,
}: Props) {
	return (
		<select
			name={name ? name : id}
			id={id}
			value={value}
			onChange={onChange}
			className="w-full p-3 mt-1 border-2 border-gray-200 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 rounded-lg transition-colors"
		>
			{options.map((option) => (
				<option value={option.value} key={option.value}>
					{option.label}
				</option>
			))}
		</select>
	);
}
