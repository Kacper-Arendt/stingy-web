import { useState } from "react";
import Header from "@/components/headers/AppHeader";
import Sidebar from "@/components/sidebar/Sidebar";
import s from "./systemLayout.module.css";

const SIDEBAR_OPEN = "isSidebarOpen";

const SystemLayout = ({ children }: { children: React.ReactNode }) => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(
		localStorage.getItem(SIDEBAR_OPEN) === "true",
	);

	const toggleSidebar = () => {
		const newState = !isSidebarOpen;
		setIsSidebarOpen(newState);

		localStorage.setItem(SIDEBAR_OPEN, newState.toString());
	};

	return (
		<div className={s.SystemLayout}>
			<Sidebar isOpen={isSidebarOpen} />
			<div className={s.SystemLayoutContent}>
				<Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
				<main>{children}</main>
			</div>
		</div>
	);
};

export default SystemLayout;
