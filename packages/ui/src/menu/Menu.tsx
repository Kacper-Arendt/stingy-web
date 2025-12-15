import { Menu as BaseMenu } from "@base-ui/react/menu";
import type React from "react";
import merge from "../utils/merge";
import styles from "./menu.module.css";

interface IMenuRoot extends React.ComponentProps<typeof BaseMenu.Root> {
	children: React.ReactNode;
}

const MenuRoot = ({ children, ...props }: IMenuRoot) => (
	<BaseMenu.Root {...props}>{children}</BaseMenu.Root>
);

interface IMenuTrigger extends React.ComponentProps<typeof BaseMenu.Trigger> {
	children?: React.ReactNode;
	className?: string;
}

const MenuTrigger = ({ children, className, ...props }: IMenuTrigger) => (
	<BaseMenu.Trigger className={merge(styles.trigger, className)} {...props}>
		{children}
	</BaseMenu.Trigger>
);

interface IMenuPortal extends React.ComponentProps<typeof BaseMenu.Portal> {
	children: React.ReactNode;
}

const MenuPortal = ({ children, ...props }: IMenuPortal) => (
	<BaseMenu.Portal {...props}>{children}</BaseMenu.Portal>
);

interface IMenuPositioner
	extends React.ComponentProps<typeof BaseMenu.Positioner> {
	children: React.ReactNode;
	className?: string;
}

const MenuPositioner = ({ children, className, ...props }: IMenuPositioner) => (
	<BaseMenu.Positioner
		className={merge(styles.Positioner, className)}
		{...props}
	>
		{children}
	</BaseMenu.Positioner>
);

interface IMenuPopup extends React.ComponentProps<typeof BaseMenu.Popup> {
	children: React.ReactNode;
	className?: string;
}

const MenuPopup = ({ children, className, ...props }: IMenuPopup) => (
	<BaseMenu.Popup className={merge(styles.Popup, className)} {...props}>
		{children}
	</BaseMenu.Popup>
);

interface IMenuArrow extends React.ComponentProps<typeof BaseMenu.Arrow> {
	children: React.ReactNode;
	className?: string;
}

const MenuArrow = ({ children, className, ...props }: IMenuArrow) => (
	<BaseMenu.Arrow className={merge(styles.Arrow, className)} {...props}>
		{children}
	</BaseMenu.Arrow>
);

interface IMenuItem extends React.ComponentProps<typeof BaseMenu.Item> {
	children: React.ReactNode;
	className?: string;
}

const MenuItem = ({ children, className, ...props }: IMenuItem) => (
	<BaseMenu.Item className={merge(styles.Item, className)} {...props}>
		{children}
	</BaseMenu.Item>
);

interface IMenuSeparator
	extends React.ComponentProps<typeof BaseMenu.Separator> {
	className?: string;
}

const MenuSeparator = ({ className, ...props }: IMenuSeparator) => (
	<BaseMenu.Separator
		className={merge(styles.Separator, className)}
		{...props}
	/>
);

interface IMenuRadioGroup
	extends React.ComponentProps<typeof BaseMenu.RadioGroup> {
	children: React.ReactNode;
}

const MenuRadioGroup = ({ children, ...props }: IMenuRadioGroup) => (
	<BaseMenu.RadioGroup {...props}>{children}</BaseMenu.RadioGroup>
);

interface IMenuRadioItem
	extends React.ComponentProps<typeof BaseMenu.RadioItem> {
	children: React.ReactNode;
	className?: string;
}

const MenuRadioItem = ({ children, className, ...props }: IMenuRadioItem) => (
	<BaseMenu.RadioItem className={merge(styles.RadioItem, className)} {...props}>
		{children}
	</BaseMenu.RadioItem>
);

interface IMenuRadioItemIndicator {
	children: React.ReactNode;
	className?: string;
}

const MenuRadioItemIndicator = ({
	children,
	className,
}: IMenuRadioItemIndicator) => (
	<BaseMenu.RadioItemIndicator
		className={merge(styles.RadioItemIndicator, className)}
	>
		{children}
	</BaseMenu.RadioItemIndicator>
);

const Menu = {
	Root: MenuRoot,
	Trigger: MenuTrigger,
	Portal: MenuPortal,
	Positioner: MenuPositioner,
	Popup: MenuPopup,
	Arrow: MenuArrow,
	Item: MenuItem,
	Separator: MenuSeparator,
	RadioGroup: MenuRadioGroup,
	RadioItem: MenuRadioItem,
	RadioItemIndicator: MenuRadioItemIndicator,
};

export default Menu;

// export function ExampleMenu() {
//     return (
//         <Menu.Root>
//             <Menu.Trigger>
//                 Song <ChevronDownIcon className={styles.ButtonIcon} />
//             </Menu.Trigger>
//             <Menu.Portal>
//                 <Menu.Positioner sideOffset={8}>
//                     <Menu.Popup>
//                         <Menu.Arrow>
//                             <ArrowSvg />
//                         </Menu.Arrow>
//                         <Menu.Item>Add to Library</Menu.Item>
//                         <Menu.Item>Add to Playlist</Menu.Item>
//                         <Menu.Separator />
//                         <Menu.Item>Play Next</Menu.Item>
//                         <Menu.Item>Play Last</Menu.Item>
//                         <Menu.Separator />
//                         <Menu.Item>Favorite</Menu.Item>
//                         <Menu.Item>Share</Menu.Item>
//                     </Menu.Popup>
//                 </Menu.Positioner>
//             </Menu.Portal>
//         </Menu.Root>
//     );
// }
