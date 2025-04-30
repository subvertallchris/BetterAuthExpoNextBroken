import { Image, View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { router, useNavigationContainerRef } from "expo-router";
import { authClient } from "@/src/auth-client";

export default function Index() {
	const { data: isAuthenticated } = authClient.useSession();
	const navContainerRef = useNavigationContainerRef();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	useEffect(() => {
		if (isAuthenticated) {
			if (navContainerRef.isReady()) {
				router.push("/dashboard");
			}
		}
	}, [isAuthenticated, navContainerRef.isReady()]);

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.title}>Sign In to your account</Text>
			</View>
			<View style={styles.inputContainer}>
				<TextInput
					placeholder="Email Address"
					style={styles.input}
					value={email}
					onChangeText={setEmail}
					autoCapitalize="none"
					keyboardType="email-address"
				/>
				<TextInput
					placeholder="Password"
					style={styles.input}
					secureTextEntry
					value={password}
					onChangeText={setPassword}
				/>
			</View>
			<TouchableOpacity
				style={styles.signInButton}
				onPress={() => {
					authClient.signIn.email(
						{
							email,
							password,
						},
						{
							onError: (ctx) => {
								Alert.alert("Sign In Error", ctx.error.message);
							},
						},
					);
				}}
			>
				<Text style={styles.buttonText}>Continue</Text>
			</TouchableOpacity>
			<View style={styles.footer}>
				<Text style={styles.footerText}>
					Don't have an account?{' '}
					<Text
						style={styles.linkText}
						onPress={() => {
							router.push("/sign-up");
						}}
					>
						Create Account
					</Text>
				</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#f3f4f6',
		padding: 16,
	},
	header: {
		alignItems: 'center',
		marginBottom: 24,
	},
	logo: {
		width: 40,
		height: 40,
		marginBottom: 8,
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
		marginTop: 8,
	},
	inputContainer: {
		width: '100%',
		marginBottom: 16,
	},
	input: {
		width: '100%',
		padding: 12,
		borderWidth: 1,
		borderColor: '#d1d5db',
		borderRadius: 6,
		marginBottom: 12,
		backgroundColor: '#fff',
	},
	linkButton: {
		alignSelf: 'flex-end',
		marginBottom: 16,
	},
	linkText: {
		color: '#2563eb',
		textDecorationLine: 'underline',
		fontSize: 14,
		fontWeight: '500',
	},
	signInButton: {
		width: '100%',
		backgroundColor: '#2563eb',
		padding: 14,
		borderRadius: 6,
		alignItems: 'center',
		marginBottom: 16,
	},
	buttonText: {
		color: '#fff',
		fontWeight: 'bold',
		fontSize: 16,
	},
	footer: {
		alignItems: 'center',
	},
	footerText: {
		fontSize: 14,
	},
});