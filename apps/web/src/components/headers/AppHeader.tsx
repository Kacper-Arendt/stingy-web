import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { ModeToggle } from "../theme/mode-toggle";
import styles from "./appHeader.module.css";

export default function Header({
	toggleSidebar,
	isSidebarOpen,
}: {
	toggleSidebar: () => void;
	isSidebarOpen: boolean;
}) {
	return (
		<header className={styles.AppHeader}>
			<div className={styles.AppHeaderContent}>
				<button type="button" onClick={toggleSidebar}>
					{isSidebarOpen ? (
						<PanelLeftClose size={20} />
					) : (
						<PanelLeftOpen size={20} />
					)}
				</button>

				<div className={styles.AppHeaderActions}>
					<ModeToggle />
				</div>
			</div>
		</header>
	);
}
