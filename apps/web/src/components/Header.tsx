import { apiConfig } from "@/config/app";
import UserNav from "@/features/userProfiles/components/UserNav";
import * as m from "@/paraglide/messages";
import { Link } from "@tanstack/react-router";
import { ModeToggle } from "./theme/mode-toggle";

export default function Header() {
	return (
		<header className="border-b border-border/50 bg-top-nav backdrop-blur-xl supports-[backdrop-filter]:bg-top-nav/60 shadow-sm">
			<div className="container mx-auto px-6 py-4 flex items-center justify-between">
				<div className="flex items-center space-x-3">
					<div className="w-10 h-10 gradient-brand-icon rounded-xl flex items-center justify-center shadow-lg">
						<span className="text-white text-lg">🌀</span>
					</div>
					<div>
						<Link to="/">
							<h1 className="text-xl font-bold gradient-brand-text">
								{apiConfig.name}
							</h1>
						</Link>
						<p className="text-xs text-muted-foreground">
							{m.teams_team_retrospectives_made_simple()}
						</p>
					</div>
				</div>
				<div className="flex items-center gap-4">
					<ModeToggle />
					<UserNav />
				</div>
			</div>
		</header>
	);
}
