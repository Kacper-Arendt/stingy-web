import { ModeToggle } from "@/components/theme/mode-toggle";
import { useT } from "@/locales/useT";

export function AuthLayout({ children }: { children: React.ReactNode }) {
	const { t } = useT();

	return (
		<div className="min-h-screen bg-background flex">
			<div className="w-full flex flex-col">
				<div className="flex justify-between items-center p-6">
					<div className="lg:hidden flex items-center space-x-3">
						<div className="w-8 h-8 gradient-brand-icon rounded-lg flex items-center justify-center">
							<span className="text-white text-sm">🌀</span>
						</div>
						<span className="font-bold text-lg gradient-brand-text">
							{t("auth_app_name")}
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
					<p>{t("auth_copyright")}</p>
				</div>
			</div>
		</div>
	);
}
