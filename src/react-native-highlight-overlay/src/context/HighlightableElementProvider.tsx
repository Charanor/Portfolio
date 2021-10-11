import React, { PropsWithChildren, useCallback, useMemo, useState } from "react";

import HighlightableElementContext, { AddElement, ElementsRecord, RemoveElement } from "./context";

export type HighlightableElementProviderProps = PropsWithChildren<unknown>;

function HighlightableElementProvider({ children }: HighlightableElementProviderProps) {
	const [elements, setElements] = useState<ElementsRecord>({});

	const addElement = useCallback<AddElement>((id, node, position) => {
		setElements((oldElements) => ({ ...oldElements, [id]: { node, position } }));
	}, []);

	const removeElement: RemoveElement = useCallback<RemoveElement>((id) => {
		setElements((oldElements) => {
			delete oldElements[id];
			return { ...oldElements };
		});
	}, []);

	const contextValue = useMemo(
		() => Object.freeze([elements, { addElement, removeElement }] as const),
		[addElement, elements, removeElement]
	);

	return (
		<HighlightableElementContext.Provider value={contextValue}>
			{children}
		</HighlightableElementContext.Provider>
	);
}

export default HighlightableElementProvider;
