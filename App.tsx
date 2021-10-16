import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { supabase } from "./src/utils/supabaseInit";

export default function App() {
	const fetch = async () => {
		const { data, error, status } = await supabase.from("posts").select("*");
		console.log(data);
	};

	useEffect(() => {
		fetch();
	}, []);

	return (
		<View style={styles.container}>
			<Text>みやさんのアプリ</Text>
			<StatusBar style="auto" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
