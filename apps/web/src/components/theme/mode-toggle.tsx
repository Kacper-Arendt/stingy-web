import Menu from "@repo/ui/menu";
import { Check, SunMoon } from "lucide-react";
import { useT } from "@/locales/useT";
import { useTheme } from "./theme-provider";

export function ModeToggle({ className }: { className?: string }) {
	const { setTheme, theme } = useTheme();
	const { t } = useT();

	return (
		<Menu.Root>
			<Menu.Trigger
				className={className}
				aria-label={t("theme_toggle")}
				title={t("theme_toggle")}
			>
				<SunMoon size={20} aria-hidden="true" />
			</Menu.Trigger>
			<Menu.Portal>
				<Menu.Positioner sideOffset={8}>
					<Menu.Popup>
						<Menu.RadioGroup value={theme} onValueChange={setTheme}>
							<Menu.RadioItem value="light" closeOnClick>
								<Menu.RadioItemIndicator>
									<Check />
								</Menu.RadioItemIndicator>
								<span>{t("theme_light")}</span>
							</Menu.RadioItem>
							<Menu.RadioItem value="dark" closeOnClick>
								<Menu.RadioItemIndicator>
									<Check />
								</Menu.RadioItemIndicator>
								<span>{t("theme_dark")}</span>
							</Menu.RadioItem>
							<Menu.RadioItem value="system" closeOnClick>
								<Menu.RadioItemIndicator>
									<Check />
								</Menu.RadioItemIndicator>
								<span>{t("theme_system")}</span>
							</Menu.RadioItem>
						</Menu.RadioGroup>
					</Menu.Popup>
				</Menu.Positioner>
			</Menu.Portal>
		</Menu.Root>
	);
}
