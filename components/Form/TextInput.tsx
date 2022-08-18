import { ChangeEvent } from "react";

type Props = {
	name: string;
	id?: string;
	required?: boolean;
	placeholder?: string;
	value: string;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function TextInput({
	name,
	id,
	required,
	placeholder,
	value,
	onChange,
}: Props) {
	return (
		<input
			type="text"
			name={name}
			id={id ? id : name}
			required={required}
			placeholder={placeholder}
			value={value}
			onChange={onChange}
			className="w-full p-3 mt-1 border-2 border-gray-200 rounded transition-colors"
		/>
	);
}
