import { createContext, useState } from "react";
import defaultTranslations from "./translations/en";

export interface I18nContextValue<T, L> {
	lang: L;
	t: (key: T) => string;
	setLang: (lang: L) => Promise<void>;
}

export type TranslationKeys = keyof typeof defaultTranslations;
export type LanguageCode = "en" | "pl";
export type Translations = Record<TranslationKeys, string>;

export const I18nContext = createContext<I18nContextValue<
	TranslationKeys,
	LanguageCode
> | null>(null);

async function loadTranslations(lang: LanguageCode): Promise<Translations> {
	const translations = await import(`./translations/${lang}.ts`);
	return translations.default;
}

export function I18nProvider({
	children,
	baseLang = "en",
}: {
	children: React.ReactNode;
	baseLang?: LanguageCode;
}) {
	const [lang, setLangState] = useState<LanguageCode>(baseLang);
	const [messages, setMessages] = useState<Translations>(defaultTranslations);

	const setLang = async (newLang: LanguageCode) => {
		const m = await loadTranslations(newLang);
		setMessages(m);
		setLangState(newLang);
	};

	const t = (key: TranslationKeys) => messages[key] ?? key;

	return (
		<I18nContext.Provider value={{ lang, t, setLang }}>
			{children}
		</I18nContext.Provider>
	);
}
