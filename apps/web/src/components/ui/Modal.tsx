import Dialog from "@repo/ui/dialog";
import { cloneElement, createContext, useContext, useState } from "react";

interface ModalContextValue {
	close: () => void;
}

const ModalContext = createContext<ModalContextValue | null>(null);

export function useModal() {
	const context = useContext(ModalContext);
	if (!context) {
		throw new Error("useModal must be used within a Modal component");
	}
	return context;
}

interface ModalProps {
	trigger: React.ReactNode;
	title: string;
	children: React.ReactNode;
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
}

export function Modal({
	trigger,
	title,
	children,
	open: controlledOpen,
	onOpenChange,
}: ModalProps) {
	const [internalOpen, setInternalOpen] = useState(false);
	const isControlled =
		controlledOpen !== undefined && onOpenChange !== undefined;
	const open = isControlled ? controlledOpen : internalOpen;

	const setOpen = (value: boolean) => {
		if (isControlled && onOpenChange) onOpenChange(value);
		else setInternalOpen(value);
	};

	const close = () => {
		setOpen(false);
	};

	return (
		<ModalContext.Provider value={{ close }}>
			<Dialog.Root open={open} onOpenChange={setOpen}>
				<Dialog.Trigger
					render={(props) => cloneElement(trigger as React.ReactElement, props)}
				/>
				<Dialog.Portal>
					<Dialog.Backdrop />
					<Dialog.Popup>
						<Dialog.Close />
						<Dialog.Title>{title}</Dialog.Title>
						{children}
					</Dialog.Popup>
				</Dialog.Portal>
			</Dialog.Root>
		</ModalContext.Provider>
	);
}
