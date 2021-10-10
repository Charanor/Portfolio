import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translations from "./translations";

const defaultLanguage = "en";

export function initializeI18n() {
	i18n.use(initReactI18next).init({
		resources: translations,
		fallbackLng: defaultLanguage,
	});
}

if (process.env.NODE_ENV === "development") {
	module.hot?.accept?.(() => {
		function keys<T extends Record<string, unknown>>(arr: T) {
			return Object.keys(arr) as (keyof typeof arr)[];
		}

		// We're doing this to allow for hot reload of the translations
		// eslint-disable-next-line @typescript-eslint/no-var-requires
		const newTranslations = require("./translations") as typeof translations;
		keys(newTranslations).forEach((lang) => {
			keys(newTranslations[lang]).forEach((ns) =>
				i18n.addResourceBundle(lang, ns, newTranslations[lang][ns], true, true)
			);
		});
		i18n.emit("loaded");
	});
}
