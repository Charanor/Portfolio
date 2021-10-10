import React, { PropsWithChildren, useEffect, useMemo, useState } from "react";
import { deepMap } from "react-children-utilities";
import { Pressable, StyleSheet, View } from "react-native";

import FocusableElement from "./FocusableElement";

export type FocusOverlayProps = PropsWithChildren<{
	focusedElementId?: string | null;
	onDismiss: () => void;
}>;

function FocusOverlay({ focusedElementId, onDismiss, children }: FocusOverlayProps) {
	const [focusedComponentPosition, setFocusedComponentPosition] = useState<{
		x: number;
		y: number;
	} | null>(null);

	const [focusedElement, setFocusedElement] = useState<React.ReactElement | null>(null);
	const newChildren = useMemo(
		() =>
			focusedElementId == null
				? children
				: deepMap(children, (child) => {
						if (
							React.isValidElement(child) &&
							child.type === FocusableElement &&
							child.props.id === focusedElementId
						) {
							setFocusedElement(child);
							return React.cloneElement(child, {
								ref: (ref: View | null) => {
									if (ref == null) return;

									setFocusedComponentPosition(null);
									setTimeout(
										() =>
											ref.measureInWindow((x, y) => {
												setFocusedComponentPosition({ x, y });
											}),
										0
									);
								},
							});
						}
						return child;
				  }),
		[children, focusedElementId]
	);

	useEffect(() => {
		if (focusedElementId != null && focusedElement?.props.id !== focusedElementId) {
			console.warn(`Could not find FocusableElement with id "${focusedElementId}".`);
		}
	}, [focusedElement, focusedElementId]);

	return (
		<View style={styles.container}>
			{newChildren}
			{focusedElementId != null && focusedElement?.props.id === focusedElementId && (
				<>
					<Pressable onPress={onDismiss} style={styles.underlay} />
					{focusedComponentPosition != null && (
						<View
							style={[
								styles.focusContainer,
								{
									left: focusedComponentPosition.x,
									top: focusedComponentPosition.y,
								},
							]}
						>
							{focusedElement}
						</View>
					)}
				</>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	underlay: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: "black",
		opacity: 0.7,
	},
	focusContainer: {
		position: "absolute",
	},
});

export default FocusOverlay;
