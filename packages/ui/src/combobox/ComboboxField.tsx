import type * as React from "react";
import Combobox from "./Combobox";

export interface ComboboxFieldItem {
	id: string;
	value: string;
}

export interface ComboboxFieldProps
	extends Omit<
		React.ComponentProps<typeof Combobox.Root>,
		"children" | "value" | "onChange"
	> {
	items: ComboboxFieldItem[];
	placeholder?: string;
	emptyText?: string;
	name: string;
}

const ComboboxField = ({
	items,
	placeholder,
	emptyText,
	name,
	...rootProps
}: ComboboxFieldProps) => {
	return (
		<Combobox.Root items={items} {...rootProps}>
			<Combobox.Input placeholder={placeholder} name={name} />

			<Combobox.Portal>
				<Combobox.Positioner sideOffset={4}>
					<Combobox.Popup>
						<Combobox.Empty>{emptyText}</Combobox.Empty>
						<Combobox.List>
							{(item: ComboboxFieldItem) => (
								<Combobox.Item key={item.id} value={item}>
									<Combobox.ItemIndicator />
									<Combobox.ItemText>{item.value}</Combobox.ItemText>
								</Combobox.Item>
							)}
						</Combobox.List>
					</Combobox.Popup>
				</Combobox.Positioner>
			</Combobox.Portal>
		</Combobox.Root>
	);
};

export default ComboboxField;
