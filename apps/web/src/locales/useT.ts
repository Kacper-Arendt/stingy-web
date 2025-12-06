import { use } from "react";
import { I18nContext } from "./I18nProvider";

export function useT() {
	const ctx = use(I18nContext);
	if (!ctx) {
		throw new Error("useT must be used inside <I18nProvider>");
	}
	return ctx;
}
