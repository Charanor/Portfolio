import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { useHighlightableElements } from "./context";

export type HighlightOverlayProps = {
	focusedElementId?: string | null;
	onDismiss: () => void;
};

function HighlightOverlay({ focusedElementId, onDismiss }: HighlightOverlayProps) {
	const [elements] = useHighlightableElements();
	const focusedElementData = focusedElementId != null ? elements[focusedElementId] : null;

	return (
		<View style={StyleSheet.absoluteFill}>
			{focusedElementId != null && (
				<>
					<Pressable onPress={onDismiss} style={styles.underlay} />
					{focusedElementData != null && (
						<View
							style={[
								styles.focusContainer,
								{
									left: focusedElementData.position.x,
									top: focusedElementData.position.y,
								},
							]}
						>
							{focusedElementData.node}
						</View>
					)}
				</>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	underlay: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: "black",
		opacity: 0.7,
	},
	focusContainer: {
		position: "absolute",
	},
});

export default HighlightOverlay;
