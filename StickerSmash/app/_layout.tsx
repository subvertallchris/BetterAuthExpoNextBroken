import { Slot } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ImageBackground, View, StyleSheet } from "react-native";

export default function RootLayout() {
	return (
		<SafeAreaProvider>
			<ImageBackground
				resizeMode="cover"
				style={styles.background}
			>
				<View style={styles.overlay} />
				<Slot />
			</ImageBackground>
		</SafeAreaProvider>
	);
}

const styles = StyleSheet.create({
	background: {
		flex: 1,
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		...StyleSheet.absoluteFillObject,
	},
	overlay: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: 'black',
		opacity: 0.2,
	},
});