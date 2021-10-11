import React, { PropsWithChildren, useEffect, useRef } from "react";
import { View } from "react-native";

import { useHighlightableElements } from "./context";

export type HighlightableElementProps = PropsWithChildren<{
	/** The id used by the HighlightOverlay to find this element. */
	id: string;
}>;

function HighlightableElement({ id, children }: HighlightableElementProps) {
	const ref = useRef<View | null>(null);

	const [_, { addElement, removeElement }] = useHighlightableElements();

	useEffect(() => {
		const refVal = ref.current;
		if (refVal == null) {
			console.debug("Ref is null");
			return;
		}

		const timeoutId = setTimeout(
			() =>
				ref.current?.measureInWindow((x, y) => {
					addElement(id, children, { x, y });
				}),
			0
		);

		return () => {
			clearTimeout(timeoutId);
			removeElement(id);
		};
		// We don't want to re-run this effect when addElement or removeElement changes.
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id, children]);

	return (
		<View collapsable={false} ref={ref}>
			{children}
		</View>
	);
}

export default HighlightableElement;
