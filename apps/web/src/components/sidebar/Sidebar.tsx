import { Avatar } from "@repo/ui/avatar";
import merge from "@repo/ui/merge";
import styles from "./sidebar.module.css";

const Sidebar = ({ isOpen }: { isOpen: boolean }) => {
	return (
		<div
			className={merge(
				styles.Sidebar,
				isOpen ? styles.SidebarOpen : styles.SidebarClosed,
			)}
		>
			<div className={styles.SidebarContent}>
				<div className={styles.SidebarHeader}>
					<p>XX</p>
				</div>

				<div className={styles.SidebarFooter}>
					<div>
						<Avatar
							src="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=128&h=128&dpr=2&q=80"
							alt="User"
							className={styles.Avatar}
							size="md"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
