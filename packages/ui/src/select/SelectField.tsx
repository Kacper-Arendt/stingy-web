import type * as React from "react";
import Select from "./Select";

export interface SelectFieldItem {
	label: string;
	value: string;
}

export interface SelectFieldProps
	extends Omit<React.ComponentProps<typeof Select.Root>, "children"> {
	items: SelectFieldItem[];
	placeholder?: string;
}

const SelectField = ({
	items,
	placeholder,
	...rootProps
}: SelectFieldProps) => {
	const allItems = placeholder
		? [{ label: placeholder, value: "" }, ...items]
		: items;

	return (
		<Select.Root items={allItems} {...rootProps}>
			<Select.Trigger>
				<Select.Value />
				<Select.Icon />
			</Select.Trigger>
			<Select.Portal>
				<Select.Positioner sideOffset={8}>
					<Select.Popup>
						<Select.List>
							{allItems.map(({ label, value }) => (
								<Select.Item key={value || "__placeholder__"} value={value}>
									<Select.ItemIndicator />
									<Select.ItemText>{label}</Select.ItemText>
								</Select.Item>
							))}
						</Select.List>
					</Select.Popup>
				</Select.Positioner>
			</Select.Portal>
		</Select.Root>
	);
};

export default SelectField;
