import translations from "../libs/i18n/translations";

declare module "react-i18next" {
	type DefaultResources = typeof translations["en"];
	// We're doing this because of declaration merging
	// eslint-disable-next-line @typescript-eslint/no-empty-interface
	interface Resources extends DefaultResources {}
}
