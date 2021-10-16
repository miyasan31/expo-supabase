import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { supabase } from "./src/utils/supabaseInit";

/** URL polyfill. Required for Supabase queries to work in React Native. */
import "react-native-url-polyfill/auto";

type Post = {
	id: number;
	title: string;
	postText: string;
	username: string;
};

export default function App() {
	const [state, setState] = useState<Post[]>([]);

	const fetch = async () => {
		try {
			const { data, error } = await supabase.from<Post>("posts").select("*");
			if (error) {
				throw new Error("エラーが起きました");
			}
			setState(data!);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		fetch();
	}, []);

	return (
		<View style={styles.container}>
			<FlatList
				scrollEnabled={true}
				data={state}
				keyExtractor={(item) => `${item.id}`}
				renderItem={({ item: post }) => (
					<Text>{post.username}さんのアプリ</Text>
				)}
			/>
			<StatusBar style="auto" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		diplay: "flex",
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
