import { createFileRoute } from "@tanstack/react-router";
import { useT } from "@/locales/useT";

export const Route = createFileRoute("/auth/")({
	// component: Login,
	component: RouteComponent,
});

function RouteComponent() {
	const { t, lang, setLang } = useT();

	return (
		<div>
			<div>{t("hello")}</div>
			<div>{lang}</div>
			<button onClick={() => setLang("pl")} type="button">
				Set PL
			</button>
			<button onClick={() => setLang("en")} type="button">
				Set EN
			</button>
		</div>
	);
}
