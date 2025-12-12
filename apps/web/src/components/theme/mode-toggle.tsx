import { Moon, Sun } from "lucide-react";

// import { Button } from "@/components/ui/button";
import { useT } from "@/locales/useT";
import { useTheme } from "./theme-provider";

export function ModeToggle({ className }: { className?: string }) {
	const { setTheme } = useTheme();
	const { t } = useT();

	return null;

	// todo

	// return (
	// 	<DropdownMenu>
	// 		<DropdownMenuTrigger asChild>
	// 			<Button variant="outline" size="icon" className={cn(className)}>
	// 				<Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
	// 				<Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
	// 				<span className="sr-only">{t("theme_toggle")}</span>
	// 			</Button>
	// 		</DropdownMenuTrigger>
	// 		<DropdownMenuContent align="end">
	// 			<DropdownMenuItem onClick={() => setTheme("light")}>
	// 				{t("theme_light")}
	// 			</DropdownMenuItem>
	// 			<DropdownMenuItem onClick={() => setTheme("dark")}>
	// 				{t("theme_dark")}
	// 			</DropdownMenuItem>
	// 			<DropdownMenuItem onClick={() => setTheme("system")}>
	// 				{t("theme_system")}
	// 			</DropdownMenuItem>
	// 		</DropdownMenuContent>
	// 	</DropdownMenu>
	// );
}
