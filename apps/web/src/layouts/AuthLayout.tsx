import { ModeToggle } from "@/components/theme/mode-toggle";
import * as m from "@/paraglide/messages";
import { ChartLine, Clapperboard, Users } from "lucide-react";

export function AuthLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="min-h-screen bg-background flex">
			{/* Left side - Branding */}
			<div className="hidden lg:flex lg:w-1/2 gradient-brand-bg relative overflow-hidden">
				<div className="absolute inset-0 bg-black/20" />
				<div className="relative w-full flex flex-col justify-center items-center p-12 text-white">
					<div className="w-24 h-24 bg-white/20 rounded-3xl flex items-center justify-center mb-8 backdrop-blur-sm">
						<span className="text-4xl">🌀</span>
					</div>

					<h1 className="text-4xl font-bold mb-4 text-center">
						{m.auth_app_name()}
					</h1>
					<p className="text-xl text-center text-white/90 max-w-md leading-relaxed">
						{m.auth_app_tagline()}
					</p>

					<div className="mt-12 grid grid-cols-3 gap-8 opacity-80">
						<div className="text-center">
							<div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-3 mx-auto">
								<Users />
							</div>
							<p className="text-sm">{m.auth_team_collaboration()}</p>
						</div>
						<div className="text-center">
							<div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-3 mx-auto">
								<Clapperboard />
							</div>
							<p className="text-sm">{m.auth_actionable_insights()}</p>
						</div>
						<div className="text-center">
							<div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-3 mx-auto">
								<ChartLine />
							</div>
							<p className="text-sm">{m.auth_continuous_improvement()}</p>
						</div>
					</div>
				</div>

				{/* Decorative elements */}
				<div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-xl" />
				<div className="absolute bottom-20 right-20 w-40 h-40 bg-white/10 rounded-full blur-xl" />
				<div className="absolute top-1/2 left-1/3 w-24 h-24 bg-white/10 rounded-full blur-xl" />
			</div>

			{/* Right side - Auth form */}
			<div className="w-full lg:w-1/2 flex flex-col">
				{/* Header with theme toggle */}
				<div className="flex justify-between items-center p-6">
					<div className="lg:hidden flex items-center space-x-3">
						<div className="w-8 h-8 gradient-brand-icon rounded-lg flex items-center justify-center">
							<span className="text-white text-sm">🌀</span>
						</div>
						<span className="font-bold text-lg gradient-brand-text">
							{m.auth_app_name()}
						</span>
					</div>

					<ModeToggle className="ml-auto" />
				</div>

				{/* Main content */}
				<div className="flex-1 flex items-center justify-center p-6">
					<div className="w-full max-w-md">{children}</div>
				</div>

				{/* Footer */}
				<div className="p-6 text-center text-sm text-muted-foreground">
					<p>{m.auth_copyright()}</p>
				</div>
			</div>
		</div>
	);
}
