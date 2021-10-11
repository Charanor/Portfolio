import React from "react";

export type Position = { x: number; y: number };
export type ElementsRecord = Record<string, { node: React.ReactNode; position: Position }>;
export type AddElement = (id: string, node: React.ReactNode, position: Position) => void;
export type RemoveElement = (id: string) => void;

const HighlightableElementContext = React.createContext<
	readonly [
		elements: ElementsRecord,
		actions: {
			readonly addElement: AddElement;
			readonly removeElement: RemoveElement;
		}
	]
>([
	{},
	{
		addElement: () => {
			throw new Error(
				"No implementation for 'addElement' found! Did you forget to wrap your app in <HighlightableElementProvider />?"
			);
		},
		removeElement: () => {
			throw new Error(
				"No implementation for 'removeElement' found! Did you forget to wrap your app in <HighlightableElementProvider />?"
			);
		},
	},
]);

export default HighlightableElementContext;
