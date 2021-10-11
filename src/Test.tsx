import React from "react";
import { Pressable, SafeAreaView, StyleSheet, Text } from "react-native";

import { HighlightableElement } from "react-native-highlight-overlay";

export const FOCUSED_KEY_1 = "focused1";
export const FOCUSED_KEY_2 = "focused2";

export type TestProps = { setHighlightKey: (key: string) => void };

function Test({ setHighlightKey }: TestProps) {
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
					setHighlightKey(FOCUSED_KEY_2);
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
					setHighlightKey(FOCUSED_KEY_1);
				}}
			>
				<Text style={{ color: "black" }}>Switch focus to cyan button</Text>
			</Pressable>
		);
	}

	return (
		<SafeAreaView style={styles.container}>
			<HighlightableElement id={FOCUSED_KEY_1}>
				<T1 />
			</HighlightableElement>
			<HighlightableElement id={FOCUSED_KEY_2}>
				<T2 />
			</HighlightableElement>
			<Pressable
				style={{
					backgroundColor: "blue",
					padding: 10,
					borderRadius: 10,
					marginBottom: 10,
				}}
				onPress={() => {
					setHighlightKey("blash");
				}}
			>
				<Text style={{ color: "white" }}>Turn off</Text>
			</Pressable>
		</SafeAreaView>
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

export default Test;
