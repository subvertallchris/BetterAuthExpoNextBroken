import { createAuthClient } from "better-auth/react";
import { expoClient } from "@better-auth/expo/client";
import * as SecureStore from "expo-secure-store";
import { usernameClient } from 'better-auth/client/plugins';

export const authClient = createAuthClient({
	baseURL: "http://localhost:3000",
	disableDefaultFetchPlugins: true,
	plugins: [
		expoClient({
			scheme: "myapp",
      storagePrefix: "myapp",
			storage: SecureStore,
		}),
    usernameClient(),
	],
});