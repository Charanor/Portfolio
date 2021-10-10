import { StoreProvider } from "easy-peasy";
import React, { useState } from "react";
import { Pressable, SafeAreaView, StyleSheet, Text } from "react-native";

import FocusOverlay from "./FocusOverlay";
import FocusableElement from "./FocusOverlay/FocusableElement";
import store from "./libs/state/store";

const FOCUSED_KEY_1 = "focused1";
const FOCUSED_KEY_2 = "focused2";

function App() {
	const [focusedId, setFocusKey] = useState<string | null>(null);

	function T1() {
		return (
			<Pressable
				style={{
					backgroundColor: "cyan",
					padding: 10,
					borderRadius: 10,
					marginBottom: 10,
				}}
				onPress={() => {
					setFocusKey(FOCUSED_KEY_2);
				}}
			>
				<Text style={{ color: "black" }}>Switch focus to orange button</Text>
			</Pressable>
		);
	}

	function T2() {
		return (
			<Pressable
				style={{
					backgroundColor: "orange",
					padding: 10,
					borderRadius: 10,
					marginBottom: 10,
				}}
				onPress={() => {
					setFocusKey(FOCUSED_KEY_1);
				}}
			>
				<Text style={{ color: "black" }}>Switch focus to cyan button</Text>
			</Pressable>
		);
	}

	return (
		<StoreProvider store={store}>
			<FocusOverlay
				focusedElementId={focusedId}
				onDismiss={() => {
					setFocusKey(null);
				}}
			>
				<SafeAreaView style={styles.container}>
					<FocusableElement id={FOCUSED_KEY_1}>
						<T1 />
					</FocusableElement>
					<FocusableElement id={FOCUSED_KEY_2}>
						<T2 />
					</FocusableElement>
					<Pressable
						style={{
							backgroundColor: "blue",
							padding: 10,
							borderRadius: 10,
							marginBottom: 10,
						}}
						onPress={() => {
							setFocusKey("blash");
						}}
					>
						<Text style={{ color: "white" }}>Turn off</Text>
					</Pressable>
				</SafeAreaView>
			</FocusOverlay>
		</StoreProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#F0F0F0",
	},
});

export default App;
