import { createStore, createTypedHooks } from "easy-peasy";

import model, { GlobalState } from "./model";

const store = createStore(model);

if (process.env.NODE_ENV === "development") {
	module.hot?.accept?.(() => {
		// eslint-disable-next-line @typescript-eslint/no-var-requires
		const newModel = require("./model") as typeof model;
		store.reconfigure(newModel);
	});
}

export default store;
export const { useStoreActions, useStoreDispatch, useStoreState, useStore } =
	createTypedHooks<GlobalState>();
